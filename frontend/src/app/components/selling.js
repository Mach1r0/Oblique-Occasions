'use client';
import React, { useState, useEffect } from 'react';
import { fetchAlbums } from '../fetch/fetchData';
import styles from './style/Selling.module.css';
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";


export default function Selling() {
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const fetchedAlbums = await fetchAlbums();
        setAlbums(fetchedAlbums);
        console.log(fetchAlbums)
      } catch (error) {
        setError("Failed to load albums. Please try again later.");
      }
    };

    loadAlbums();
  }, []);

  const HandleNext = () => {
    if ((currentPage + 1) * itemsPerPage < albums.length) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  }

  const HandlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  }

  const displayAlbums = albums.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  return (
    <div className={styles.containerAll}>
      <h1>Selling Right Now </h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className={styles.containerContent}>
          <button
            className={styles['button-prev-style']}
            onClick={HandlePrev}
            disabled={currentPage === 0}
          >
            <GrLinkPrevious />
          </button>
          {displayAlbums.map((album, index) => (
            <div key={index} className={styles.albumContainer}>
              <img src={album.picture} alt={album.name} className={styles.albumImage} />
              <div className={styles.albumText}>
                <h2>{album.title} </h2>
                <p>sold for €{album.price} </p>
                <p>by {album.Artist} </p>
              </div>
            </div>
          ))}
          <button
            className={styles['button-next-style']}
            onClick={HandleNext}
            disabled={(currentPage + 1) * itemsPerPage >= albums.length}
          >
            <GrLinkNext />
          </button>
        </div>
      )}
    </div>
  );
}
