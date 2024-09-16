"use client";
import React, { useEffect, useState } from "react";
import {
  fetchArtistAlbums,
  fetchArtist,
  followArtist,
  checkFollowStatus,
} from "../../fetch/fetchData";
import styles from "../../style/ArtistDetail.module.css";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { handleFollow, handleUnfollow } from "../../fetch/fetchData";

interface Artist {
  id: string;
  name: string;
  picture?: string;
  location?: string;
  bio?: string;
  website?: string;
}

export default function ArtistPage() {
  const [albums, setAlbums] = useState([]);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const name = params.name as string;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedArtist = await fetchArtist(name);
        setArtist(fetchedArtist);
        const fetchedAlbums = await fetchArtistAlbums(name);
        setAlbums(fetchedAlbums);
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const followStatus = await checkFollowStatus(fetchedArtist.id);
            setIsFollowing(followStatus.is_following);
          } catch (error) {
            console.error("Error checking follow status:", error);
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
        setError("Failed to load data. Please try again");
      }
    };
    if (name) {
      loadData();
    }
  }, [name]);

  if (error) return <div className={styles.error}>{error}</div>;
  if (!artist) return <div className={styles.loading}>Loading...</div>;

  const onFollow = async () => {
    if (!artist) return;
    const success = await handleFollow(Number(artist.id));
    if (success) {
      setIsFollowing(true);
    }
  };
  
  const onUnfollow = async () => {
    if (!artist) return;
    console.log("Attempting to unfollow artist with ID:", artist.id); 
    const success = await handleUnfollow(Number(artist.id));
    if (success) {
      setIsFollowing(false);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Albums & EPs</h1>
        <div className={styles.albumGrid}>
          {albums.map((album: any, index: number) => (
            <div key={index} className={styles.albumItem}>
              <Link
                href={`/album/${encodeURIComponent(
                  album.title.replace(/ /g, "-")
                )}`}
              >
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
        <img
          src={artist.picture}
          alt={artist.name}
          className={styles.artistImage}
        />
        <h2 className={styles.artistName}>{artist.name}</h2>
        <p className={styles.artistLocation}>{artist.location}</p>
        <p className={styles.artistBio}>{artist.bio}</p>
        {token &&
          (isFollowing ? (
            <button className={styles.followButton} onClick={onUnfollow}>
              Unfollow
            </button>
          ) : (
            <button className={styles.followButton} onClick={onFollow}>
              Follow
            </button>
          ))}

        <div className={styles.socialLinks}>
          <a href="#" className={styles.socialLink}>
            SoundCloud
          </a>
          <a href="#" className={styles.socialLink}>
            Twitter
          </a>
          <a href="#" className={styles.socialLink}>
            Instagram
          </a>
        </div>
        <a href="#" className={styles.websiteLink}>
          {artist.website}
        </a>
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