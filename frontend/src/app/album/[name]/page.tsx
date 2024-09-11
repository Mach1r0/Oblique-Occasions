'use client';
import { useEffect, useState } from 'react';
import React from 'react'
import { fetchAlbum, fetchArtist } from '@/app/fetch/fetchData';
import { useParams } from 'next/navigation'
import styles from '../../style/Album.module.css';

export default function AlbumPage() {
    const [album, setAlbum] = useState(null);
    const [artist, setArtist] = useState(null);
    const [error, setError] = useState(null);
    const params = useParams()
    const name = params.name as string;

    useEffect(() => {
        const loadData = async () => {
            try {
                const fetchedAlbums = await fetchAlbum(name);
                if (fetchedAlbums.length > 0) {
                    const fetchedAlbum = fetchedAlbums[0];
                    console.log("Fetched album:", fetchedAlbum); 
                    setAlbum(fetchedAlbum);
                    if (fetchedAlbum.artist_slug) {
                        const fetchedArtist = await fetchArtist(fetchedAlbum.artist_slug);
                        setArtist(fetchedArtist);
                    } else {
                        console.error("Artist slug is missing from album data");
                    }
                } else {
                    setError("Album not found");
                }
            } catch (error) {
                console.error("Error in loadData:", error);
                setError("Failed to load album. Please try again");
            }
        };
        loadData();
    }, [name]);

    if (error) return <div className={styles['album-container']}><p className={styles.error}>{error}</p></div>;
    if (!album) return <div className={styles['album-container']}><p>Loading...</p></div>;

    return (
        <div className={styles['album-container']}>
            <h1 className={styles['album-title']}>{album.title}</h1>
            <div className={styles['album-content']}>
                <div className={styles['album-details']}>
                    <img src={album.picture || '/default-album.jpg'} alt={album.title} className={styles['album-image']} />
                    <div className={styles['audio-player']}>
                        {/* Add your audio player component here */}
                        <p>Audio player placeholder</p>
                    </div>
                    <div className={styles['purchase-options']}>
                        <p><strong>Price:</strong> ${album.price}</p>
                        <button>Buy Digital Album</button>
                    </div>
                    <div className={styles['album-info']}>
                        <p><strong>Release Date:</strong> {new Date(album.ReleaseDate).toLocaleDateString()}</p>
                        <p><strong>Bio:</strong> {album.bio}</p>
                        <p><strong>Genres:</strong> {album.genres.join(', ')}</p>
                    </div>
                </div>
                <div className={styles['artist-info']}>
                    <h2 className={styles['artist-name']}>{album.artist_name}</h2>
                    {artist && artist.picture && 
                        <img src={artist.picture} alt={album.artist_name} className={styles['artist-image']} />
                    }
                    <div className={styles['social-links']}>
                        {/* Add social media links here if available */}
                        <p>Social links placeholder</p>
                    </div>
                    <div className={styles['discography']}>
                        {/* We don't have other albums information in the current data structure */}
                        <p>Other albums not available</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
