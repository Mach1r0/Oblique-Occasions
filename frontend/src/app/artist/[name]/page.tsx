"use client";
import React, { useEffect, useState } from "react";
import { fetchArtistAlbums, fetchArtist } from "../../fetch/fetchData";
import styles from "../../style/ArtistDetail.module.css";
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ArtistPage() {
  const [albums, setAlbums] = useState([]);
  const [artist, setArtist] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams();
  const name = params.name as string;

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedArtist = await fetchArtist(name);
        setArtist(fetchedArtist);
        const fetchedAlbums = await fetchArtistAlbums(name);
        setAlbums(fetchedAlbums);
      } catch (error) {
        setError("Failed to load data. Please try again");
      }
    };
    if (name) {
      loadData();
    }
  }, [name]);

  if (error) return <div className={styles.error}>{error}</div>;
  if (!artist) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Albums & EPs</h1>
        <div className={styles.albumGrid}>
          {albums.map((album: any, index: number) => (
            <div key={index} className={styles.albumItem}>
              <Link href={`/album/${encodeURIComponent(album.title.replace(/ /g, '-'))}`}>
                <img
                  src={album.picture}
                  alt={album.title}
                  className={styles.albumCover}
                />
                <h2 className={styles.albumTitle}>{album.title}</h2>
              </Link>
              <p className={styles.albumArtist}>{artist.name}</p>
            </div>
          ))}
        </div>
      </main>
      <aside className={styles.sidebar}>
        <img src={artist.picture} alt={artist.name} className={styles.artistImage} />
        <h2 className={styles.artistName}>{artist.name}</h2>
        <p className={styles.artistLocation}>{artist.location}</p>
        <p className={styles.artistBio}>{artist.bio}</p>
        <button className={styles.followButton}>Follow</button>
        <div className={styles.socialLinks}>
          <a href="#" className={styles.socialLink}>SoundCloud</a>
          <a href="#" className={styles.socialLink}>Twitter</a>
          <a href="#" className={styles.socialLink}>Instagram</a>
        </div>
        <a href="#" className={styles.websiteLink}>{artist.website}</a>
        <div className={styles.contactHelp}>
          <a href="#">Contact {artist.name}</a>
          <a href="#">Streaming and Download help</a>
          <a href="#">Redeem code</a>
          <a href="#">Report this account</a>
        </div>
      </aside>
    </div>
  );
}