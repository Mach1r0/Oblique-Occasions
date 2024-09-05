"use client";
import React, { useEffect, useState } from "react";
import { fetchArtistAlbums } from "../../fetch/fetchData";
import styles from "../../style/Artist.module.css";
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ArtistPage() {
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);
  const params = useParams();
  const name = params.name as string;

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const fetchedAlbums = await fetchArtistAlbums(name);
        setAlbums(fetchedAlbums);
      } catch (error) {
        setError("Failed to load albums. Please try again");
      }
    };
    if (name) {
      loadAlbums();
    }
  }, [name]);

  return (
    <div className={styles['container-all']}>
      <div className={styles["container-content"]}>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles["album-grid"]}>
          {albums.map((album: any, index: number) => (
            <div key={index} className={styles["album-item"]}>
              <Link href={`/album/${encodeURIComponent(album.title.replace(/ /g, '-'))}`}>
                <img
                  src={album.picture}
                  alt={album.title}
                  className={styles["image-album"]}
                />
                <h2 className={styles["album-title"]}>{album.title}</h2>
              </Link>
              <p className={styles["album-artist"]}>{album.Artist}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}