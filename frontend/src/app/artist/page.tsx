"use client";
import React, { useEffect, useState } from "react";
import { fetchAlbums } from "../fetch/fetchData";
import styles from "../style/Artist.module.css";

export default function Page() {
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);

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
    <div className={styles["container-all"]}>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles["album-grid"]}>
        {albums.map((album: any, index: number) => (
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
  );
}
