import React, { useState, useRef, useEffect } from 'react';
import styles from '../../style/Album.module.css';

interface Track {
  id: string;
  title: string;
  music_file: string;
  duration: number;
}

const AudioPlayer: React.FC<{ tracks: Track[] }> = ({ tracks }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playTrack = (index: number) => {
    setCurrentTrackIndex(index);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  };

  const previousTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = tracks[currentTrackIndex].music_file;
      audioRef.current.play();
    }
  }, [currentTrackIndex, tracks]);

  return (
    <div className={styles['audio-player']}>
      <h3>Tracks</h3>
      <ul className={styles['track-list']}>
        {tracks.map((track, index) => (
          <li
            key={track.id}
            onClick={() => playTrack(index)}
            className={`${styles['track-item']} ${index === currentTrackIndex ? styles['track-item-playing'] : ''}`}
          >
            {track.title} - {Math.floor(track.duration / 60)}:{Math.floor(track.duration % 60).toString().padStart(2, '0')}
          </li>
        ))}
      </ul>
      <div className={styles['player-controls']}>
        <button onClick={previousTrack} className={styles['control-button']}>Previous</button>
        <audio ref={audioRef} controls className={styles['audio-element']} />
        <button onClick={nextTrack} className={styles['control-button']}>Next</button>
      </div>
      {tracks[currentTrackIndex] && (
        <p className={styles['now-playing']}>Now playing: {tracks[currentTrackIndex].title}</p>
      )}
    </div>
  );
};

export default AudioPlayer;