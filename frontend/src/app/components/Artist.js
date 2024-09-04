'use client';
import React, { use } from 'react'
import { useEffect, useState } from 'react';
import { fetchArtist} from '../fetch/fetchData'
import Style from './style/Artist.module.css'
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";

export default function Artist() {
    const [artist, setArtist] = useState(0);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(); 

    useEffect(() => {
        const loadArtist = async () =>



            F
    })
  return (
    <div>Artist</div>
  )
}
