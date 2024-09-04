'use client';
import React, { useEffect, useState } from 'react';
import { fetchArtist } from '../fetch/fetchData';
import Style from './style/Artist.module.css';
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

export default function Artist() {
    const [artist, setArtist] = useState([]); // Initialize as an empty array
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(); 

    useEffect(() => {
        const loadArtist = async () => {
          try {
            const artist = await fetchArtist();
            setArtist(artist);
            console.log(artist)
          } catch (error) {
            setError(error.message);
          }
        };
        loadArtist();
    }, []); 

    return (
        <div className={Style['container-all']}>
            <div className={Style['container-content']}>
                <button className={Style['button-prev-style']}>
                    <GrLinkPrevious />
                </button>  
                {artist.map((artist, index) => (
                    <div key={index} className={Style['Artist-container']}>
                        <img src={artist.picture} alt={artist.name} className={Style['artist-image']} />
                        <p>{artist.name}</p>
                        <p>{artist.age}</p>
                    </div>
                ))}
                 <button className={Style['button-next-style']}>
                    <GrLinkNext />
                </button>  
            </div>
        </div>
    );
}
