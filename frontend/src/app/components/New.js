'use client';
import React, { useEffect, useState } from 'react'
import Style from "./style/New.module.css"
import { fetchAlbums } from '../fetch/fetchData'
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import Link from 'next/link'

export default function New() {
  const [albums, setAlbums] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const getNewAlbums = async () => {
      const allAlbums = await fetchAlbums();
      const sortedAlbums = allAlbums.sort((a, b) => new Date(b.ReleaseDate) - new Date(a.ReleaseDate));
      const newestAlbums = sortedAlbums.slice(0, 10);

      setAlbums(newestAlbums);
    };

    getNewAlbums();
  }, [])
  
  const HandleNext = () => {
    if ((currentPage + 1) * itemsPerPage < albums.length) {
      setCurrentPage(prevPage => prevPage + 1)
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
    <div className={Style.container}>
      <ul className={Style.albumList}>
      <button
            className={Style['button-prev-style']}
            onClick={HandlePrev}
            disabled={currentPage === 0}
          >
            <GrLinkPrevious />
          </button>
        {displayAlbums.map((album) => (
          <li key={album.id} className={Style.albumItem}>
            <img src={album.picture} alt={album.title} />
            <Link href={`/album/${encodeURIComponent(album.title.replace(/ /g, '-'))}`}>
            <h3>{album.title}</h3>
            </Link>
            <p>Release Date: {new Date(album.ReleaseDate).toLocaleDateString()}</p>
          </li>
        ))}
          <button
            className={Style['button-next-style']}
            onClick={HandleNext}
            disabled={(currentPage + 1) * itemsPerPage >= albums.length}
          >
            <GrLinkNext />
          </button>
      </ul>
    </div>
  )
}
