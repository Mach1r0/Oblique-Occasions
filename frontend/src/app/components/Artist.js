'use client';
import React, { useEffect, useState } from 'react';
import { fetchArtists } from '../fetch/fetchData';
import Style from './style/Artist.module.css';
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import Link from 'next/link'

export default function Artist() {
    const [artists, setArtists] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;

    useEffect(() => {
        const loadArtists = async () => {
            try {
                const fetchedData = await fetchArtists();
                console.log('Fetched artists data:', fetchedData);
                
                let artistsArray;
                if (Array.isArray(fetchedData)) {
                    artistsArray = fetchedData;
                } else if (fetchedData.results && Array.isArray(fetchedData.results)) {
                    artistsArray = fetchedData.results;
                } else {
                    throw new Error('Unexpected data structure');
                }
                
                setArtists(artistsArray.slice(0, 13)); 
            } catch (error) {
                setError(error.message);
                console.error('Error fetching artists:', error);
            }
        };
        loadArtists();
    }, []); 

    const HandleNext = () => {
        setCurrentPage(prev => Math.min(prev + 1, Math.ceil(artists.length / itemsPerPage) - 1));
    };

    const HandlePrev = () => {
        setCurrentPage(prev => Math.max(prev - 1, 0));
    };

    const displayArtist = artists.slice(
        currentPage * itemsPerPage, 
        (currentPage + 1) * itemsPerPage
    );

    if (error) {
        return <div className={Style.error}>Error: {error}</div>;
    }

    if (artists.length === 0) {
        return <div className={Style.loading}>Loading...</div>;
    }

    return (
        <div className={Style['container-all']}>
            <div className={Style['container-content']}>
                <button onClick={HandlePrev} className={Style['button-prev-style']} disabled={currentPage === 0}>
                    <GrLinkPrevious />
                </button>  
                {displayArtist.map((artist, index) => (
                    <div key={index} className={Style['Artist-container']}>
                        <img 
                            src={artist.picture ? artist.picture : '/default-artist-image.jpg'} 
                            alt={artist.name} 
                            className={Style['artist-image']} 
                        />
                        <Link href={`/artist/${artist.slug}`}>
                            <p>{artist.name}</p>
                        </Link>
                    </div>
                ))}
                <button onClick={HandleNext} className={Style['button-next-style']} disabled={(currentPage + 1) * itemsPerPage >= artists.length}>
                    <GrLinkNext />
                </button>  
            </div>
        </div>
    );
}
