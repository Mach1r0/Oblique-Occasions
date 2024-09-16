"use client";
import React, { useEffect, useState } from "react";
import { fetchAlbums } from "../fetch/fetchData";
import styles from "../style/Artist.module.css";

interface Album {
  image: string;
  title: string;
  artist: string;
}

export default function Page() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const LoadAlbums = async () => {
      try {
        const FetchAlbums = await fetchAlbums();
        setAlbums(FetchAlbums);
      } catch (error) {
        setError("Failed to load albums. Please try again");
      }
    };
    LoadAlbums();
  }, []);

  return (
    <div className={styles['container-all']}>
    <div className={styles["container-content"]}>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles["album-grid"]}>
          {albums.map((album, index) => (
            <div key={index} className={styles["album-item"]}>
              <img
                src={album.image}
                alt={album.title}
                className={styles["image-album"]}
              />
              <h2 className={styles["album-title"]}>{album.title}</h2>
              <p className={styles["album-artist"]}>{album.artist}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}