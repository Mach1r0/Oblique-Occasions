'use client';
import { useEffect, useState } from 'react';
import React from 'react'
import { fetchAlbum } from '@/app/fetch/fetchData';
import { useParams } from 'next/navigation'
import styles from '../../style/Album.module.css';

export default function AlbumPage() {
    const [album, setAlbum] = useState(null)
    const [error, setError] = useState(null); 
    const params = useParams()
    const name = params.name as string;

    useEffect(() => {
        const loadAlbum = async () => {
            try {
                const fetchedAlbum = await fetchAlbum(name); 
                setAlbum(fetchedAlbum);
            } catch (error) {
                setError("Failed to load album. Please try again");
            }
        };
        loadAlbum();
    }, [name]);

    if (error) return <div className={styles['album-container']}><p className={styles.error}>{error}</p></div>;
    if (!album) return <div className={styles['album-container']}><p>Loading...</p></div>;

    return (
        <div className={styles['album-container']}>
            <h1 className={styles['album-title']}>{album.title}</h1>
            <div className={styles['album-content']}>
                <img src={album.picture} alt={album.title} className={styles['album-image']} />
                <div className={styles['album-info']}>
                    <p><strong>Artist:</strong> {album.artist_name}</p>
                    <p><strong>Price:</strong> ${album.price}</p>
                    <p><strong>Release Date:</strong> {new Date(album.ReleaseDate).toLocaleDateString()}</p>
                    <p className={styles['album-bio']}>{album.bio}</p>
                </div>
            </div>
        </div>
    )
}
