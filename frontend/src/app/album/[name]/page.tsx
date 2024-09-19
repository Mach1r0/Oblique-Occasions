"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/Context/AuthContext";
import React from "react";
import {
  fetchAlbum,
  fetchArtist,
  fetchArtistAlbums,
  handleReviewSubmit,
  FetchAlbumReviews,
} from "@/app/fetch/fetchData";
import { useParams } from "next/navigation";
import styles from "../../style/Album.module.css";
import Link from "next/link";
import AudioPlayer from "./AudioPlayer";
import { Review } from "@/app/fetch/fetchData";

interface Track {
  id: string;
  title: string;
  music_file: string;
  duration: number;
}

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
  tracks: Track[];
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
  const { user } = useAuth(); 
  const userId = user?.id; 
  const [album, setAlbum] = useState<Album | null>(null);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [artistAlbums, setArtistAlbums] = useState<RelatedAlbum[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState<number | null>(null); 
  const [albumReviews, setAlbumReviews] = useState<any[]>([]); 
  const params = useParams();
  const name = params.name as string;
  const albumId = Number(params.id);

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
            const albums = await fetchArtistAlbums(fetchedAlbum.artist_slug);
            setArtistAlbums(albums.slice(0, 3));
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

  useEffect(() => {
    if (!album) return;

    console.log("Current album:", album);

    const loadAlbumReviews = async () => {
      try {
        const reviews = await FetchAlbumReviews(album.id);
        setAlbumReviews(reviews); 
      } catch (error) {
        console.error("Error fetching album reviews:", error);
        setError("Failed to load reviews. Please try again.");
      }
    };
    loadAlbumReviews(); 
  }, [album]);

  useEffect(() => {
    if (!album) return;
  
    console.log(`Attempting to connect to WebSocket for album ID: ${album.id}`);
    const socket = new WebSocket(`ws://localhost:8000/ws/reviews/${album.id}/`);
  
    socket.onopen = () => {
      console.log(`WebSocket connection established for album ID: ${album.id}`);
    };
  
    socket.onmessage = (event) => {
      console.log(`Received message from WebSocket for album ID ${album.id}:`, event.data);
      try {
        const data = JSON.parse(event.data);
        setAlbumReviews((prevReviews) => [...prevReviews, data.review]);
      } catch (error) {
        console.error(`Error parsing WebSocket message for album ID ${album.id}:`, error);
      }
    };
  
    socket.onerror = (error) => {
      console.error(`WebSocket error for album ID ${album.id}:`, error);
    };
  
    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log(`WebSocket connection closed cleanly for album ID ${album.id}, code=${event.code}, reason=${event.reason}`);
      } else {
        console.error(`WebSocket connection died for album ID ${album.id}, code=${event.code}`);
      }
    };
  
    const reconnectInterval = setInterval(() => {
      if (socket.readyState === WebSocket.CLOSED) {
        console.log(`Attempting to reconnect WebSocket for album ID ${album.id}...`);
        const newSocket = new WebSocket(`ws://localhost:8000/ws/reviews/${album.id}/`);
        // Handle the new socket connection...
      }
    }, 5000);
  
    return () => {
      clearInterval(reconnectInterval);
      socket.close();
    };
  }, [album]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      console.error("User ID is not available");
      return;
    }
    const success = await handleReviewSubmit(album!.id, userId, newReview, rating); 
    if (success) {
      setNewReview(""); 
      setRating(null); 
      if (album) {
        try {
          const reviews = await FetchAlbumReviews(album.id);
          setAlbumReviews(reviews); 
        } catch (error) {
          console.error("Error fetching album reviews:", error);
          setError("Failed to load reviews. Please try again.");
        }
      }
    }
  };

  const handlePlayAudio = () => {
    // Logic to play audio, ensuring it's called after user interaction
  };

  if (error)
    return (
      <div className={styles["album-container"]}>
        <p className={styles.error}>{error}</p>
      </div>
    );
  if (!album)
    return (
      <div className={styles["album-container"]}>
        <p>Loading...</p>
      </div>
    );

  return (
    <div className={styles["album-container"]}>
      <h1 className={styles["album-title"]}>{album.title}</h1>
      <div className={styles["album-content"]}>
        <div className={styles["album-details"]}>
          <img
            src={album.picture || "/default-album.jpg"}
            alt={album.title}
            className={styles["album-image"]}
          />
          {album.tracks && album.tracks.length > 0 ? (
            <AudioPlayer tracks={album.tracks} />
          ) : (
            <p>No tracks available for this album.</p>
          )}
          <div className={styles["purchase-options"]}>
            <p>
              <strong>Price:</strong> ${album.price}
            </p>
            <button>Buy Digital Album</button>
          </div>
          <div className={styles["album-info"]}>
            <p>
              <strong>Release Date:</strong>{" "}
              {new Date(album.ReleaseDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Bio:</strong> {album.bio}
            </p>
            <p>
              <strong>Genres:</strong> {album.genres.join(", ")}
            </p>
          </div>
        </div>
        <div className={styles["artist-info"]}>
          <h2 className={styles["artist-name"]}>{album.artist_name}</h2>
          {artist && artist.picture && (
            <img
              src={artist.picture}
              alt={album.artist_name}
              className={styles["artist-image"]}
            />
          )}
          <div className={styles["social-links"]}>
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
          <div className={styles["discography"]}>
            <h3>Related Albums</h3>
            {artistAlbums.length > 0 ? (
              artistAlbums.slice(0, 3).map((relatedAlbum) => (
                <div key={relatedAlbum.id} className={styles["related-album"]}>
                  <img
                    src={relatedAlbum.picture || "/default-album.jpg"}
                    alt={relatedAlbum.title}
                    className={styles["related-album-image"]}
                  />
                  <Link
                    href={`/album/${encodeURIComponent(
                      relatedAlbum.title.replace(/ /g, "-")
                    )}`}
                  >
                    <p>{relatedAlbum.title}</p>
                  </Link>
                </div>
              ))
            ) : (
              <p>No related albums available</p>
            )}
          </div>
        </div>
      </div>
      <div className={styles["reviews-section"]}>
        <h3>Reviews</h3>
        <ul>
          {albumReviews.length > 0 ? (
            albumReviews.map((review: Review, index) => (
              <li key={index} className={styles.reviewItem}>
                {review.user_picture && (
                  <img
                    src={review.user_picture}
                    alt={review.user_name}
                    className={styles.userImage}
                  />
                )}
                <strong>{review.user_name}</strong>: {review.review} (Rating: {review.rating})
              </li>
            ))
          ) : (
            <p>No reviews available for this album.</p>
          )}
        </ul>
        <form onSubmit={handleSubmit} className={styles["review-form"]}>
          <input
            type="text"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write a review..."
            className={styles["review-input"]}
          />
          <input
            type="number"
            value={rating || ''}
            onChange={(e) => setRating(Number(e.target.value))}
            placeholder="Rate (1-5)"
            className={styles["rating-input"]}
            min={1}
            max={5}
            required 
          />
          <button type="submit" className={styles["submit-button"]}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}