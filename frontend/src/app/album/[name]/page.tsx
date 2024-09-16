'use client';
import { useEffect, useState } from 'react';
import React from 'react';
import { fetchAlbum, fetchArtist, fetchArtistAlbums } from '@/app/fetch/fetchData';
import { useParams } from 'next/navigation';
import styles from '../../style/Album.module.css';
import Link from 'next/link'; // Assuming Link is imported from next/link

interface Album {
  id: string;
  title: string;
  picture?: string;
  artist_slug?: string;
  price: number;
  ReleaseDate: string;
  bio: string;
  genres: string[];
  artist_name: string;
}

interface Artist {
  picture?: string;
  soundcloud?: string;
  spotify?: string;
}

interface RelatedAlbum {
  id: string;
  title: string;
  picture?: string;
}

export default function AlbumPage() {
  const [album, setAlbum] = useState<Album | null>(null);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [artistAlbums, setArtistAlbums] = useState<RelatedAlbum[]>([]); // State for artist's albums
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
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
            // Fetch artist's albums
            const albums = await fetchArtistAlbums(fetchedAlbum.artist_slug);
            setArtistAlbums(albums.slice(0, 3)); // Get the first 3 albums
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
            {artist && artist.soundcloud && (  
              <Link href={artist.soundcloud}>
                <p>Soundcloud</p>
              </Link>
            )}
            {artist && artist.spotify && (
              <Link href={artist.spotify}>
                <p>Spotify</p>
              </Link>
            )}
          </div>
          <div className={styles['discography']}>
            <h3>Related Albums</h3>
            {artistAlbums.length > 0 ? (
              artistAlbums.map((relatedAlbum) => (
                <div key={relatedAlbum.id} className={styles['related-album']}>
                  <img src={relatedAlbum.picture || '/default-album.jpg'} alt={relatedAlbum.title} className={styles['related-album-image']} />
                  <p>{relatedAlbum.title}</p>
                </div>
              ))
            ) : (
              <p>No related albums available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}