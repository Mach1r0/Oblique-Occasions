"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/Context/AuthContext"; // Importe o contexto de autenticação
import React from "react";
import {
  fetchAlbum,
  fetchArtist,
  fetchArtistAlbums,
  handleReviewSubmit,
} from "@/app/fetch/fetchData";
import { useParams } from "next/navigation";
import styles from "../../style/Album.module.css";
import Link from "next/link";
import AudioPlayer from "./AudioPlayer";

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
  const { user } = useAuth(); // Use o contexto para obter o usuário
  const userId = user?.id; // Obtenha o userId do objeto user
  const [album, setAlbum] = useState<Album | null>(null);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [artistAlbums, setArtistAlbums] = useState<RelatedAlbum[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<string[]>([]); // Move state hooks to the top
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState<number | null>(null); // Adicione um estado para o rating
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
    if (!album) return; // Add a guard clause to avoid executing this hook before `album` is available

    const socket = new WebSocket(`ws://localhost:8000/ws/reviews/${album!.id}/`);
    console.log("id", album!.id)

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setReviews((prevReviews) => [...prevReviews, data.review]);
    };

    return () => {
      socket.close();
    };
  }, [album]); // Ensure this effect only runs when `album` is available

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      console.error("User ID is not available");
      return;
    }
    const success = await handleReviewSubmit(album!.id, userId, newReview, rating); // Adicione o rating aqui
    if (success) {
      setNewReview(""); // Limpa o campo de entrada após o envio
      setRating(null); // Limpa o rating após o envio
    }
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
          {reviews.map((review, index) => (
            <li key={index}>{review}</li>
          ))}
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
