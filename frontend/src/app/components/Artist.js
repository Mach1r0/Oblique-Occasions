'use client';
import React, { useEffect, useState } from 'react';
import { fetchArtist } from '../fetch/fetchData';
import Style from './style/Artist.module.css';
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import Link from 'next/link'

export default function Artist() {
    const [artist, setArtist] = useState([]); 
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;

    useEffect(() => {
        const loadArtist = async () => {
          try {
            const fetchedArtists = await fetchArtist();
            const newArtist = fetchedArtists.slice(0, 10)
            setArtist(newArtist);
            console.log('Fetched artists:', fetchedArtists);
          } catch (error) {
            setError(error.message);
            console.error('Error fetching artists:', error);
          }
        };
        loadArtist();
    }, []); 

    const HandleNext = () => {
        if ((currentPage + 1) * itemsPerPage < artist.length) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    }

    const HandlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1); 
        }
    }

    const displayArtist = artist.slice(
        currentPage * itemsPerPage, 
        (currentPage + 1) * itemsPerPage
    );

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (artist.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className={Style['container-all']}>
            <div className={Style['container-content']}>
                <button onClick={HandlePrev} className={Style['button-prev-style']} disabled={currentPage === 0}>
                    <GrLinkPrevious />
                </button>  
                {displayArtist.map((artist, index) => (
                    <div key={index} className={Style['Artist-container']}>
                        <img src={artist.picture} alt={artist.name} className={Style['artist-image']} />
                        <Link href={`/artist/${artist.name}`}>
                        <p>{artist.name}</p>
                        </Link>
                    </div>
                ))}
                <button onClick={HandleNext} className={Style['button-next-style']} disabled={(currentPage + 1) * itemsPerPage >= artist.length}>
                    <GrLinkNext />
                </button>  
            </div>
        </div>
    );
}
