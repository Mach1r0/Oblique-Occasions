'use client';
import React, { useEffect, useState } from 'react';
import { fetchArtist } from '../fetch/fetchData';
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
            const fetchedData = await fetchArtist();
            console.log('Fetched data:', fetchedData);
            
            let artistsArray;
            if (Array.isArray(fetchedData)) {
              artistsArray = fetchedData;
            } else if (fetchedData.results && Array.isArray(fetchedData.results)) {
              artistsArray = fetchedData.results;
            } else {
              throw new Error('Unexpected data structure');
            }
            
            setArtists(artistsArray.slice(0, 10)); // Limit to 10 artists
          } catch (error) {
            setError(error.message);
            console.error('Error fetching artists:', error);
          }
        };
        loadArtists();
    }, []); 

    const HandleNext = () => {
        if ((currentPage + 1) * itemsPerPage < artists.length) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    }

    const HandlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1); 
        }
    }

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
            <h1 className={Style.title}>Artists</h1>
            <div className={Style['container-content']}>
                <button onClick={HandlePrev} className={Style['button-prev-style']} disabled={currentPage === 0}>
                    <GrLinkPrevious />
                </button>  
                {displayArtist.map((artist, index) => (
                    <div key={index} className={Style['Artist-container']}>
                        <img src={artist.picture} alt={artist.name} className={Style['artist-image']} />
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
