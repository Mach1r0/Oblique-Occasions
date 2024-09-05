'use client';
import { useEffect, useState } from 'react';
import React from 'react'
import { fetchAlbum } from '@/app/fetch/fetchData';
import { useParams } from 'next/navigation'

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

    if (error) return <div>Error: {error}</div>;
    if (!album) return <div>Loading...</div>;

    return (
        <div>
            <h1>{album.title}</h1>
            <img src={album.picture} alt={album.title} />
            <p>Artist: {album.Artist}</p>
            <p>Price: ${album.price}</p>
            <p>Release Date: {new Date(album.ReleaseDate).toLocaleDateString()}</p>
            <p>Bio: {album.bio}</p>
        </div>
    )
}