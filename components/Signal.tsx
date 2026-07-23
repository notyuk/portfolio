"use client";

import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";

type Track = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
};

export default function Signal() {
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchNowPlaying = async () => {
      try {
        const res = await fetch("/api/spotify/now-playing");
        const data = await res.json();
        if (!cancelled) setTrack(data);
      } catch {
        if (!cancelled) setTrack({ isPlaying: false });
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 20000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const playing = !loading && track?.isPlaying && track.title;

  return (
    <div className={styles.mnSig}>
      <h2>now playing</h2>
      <div className={styles.mnSigArt}>
        {playing && track!.albumImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={track!.albumImageUrl}
            alt={track!.album ?? "album cover"}
            className={styles.mnSigImg}
          />
        ) : null}
      </div>
      {loading ? (
        <p className={styles.m}>listening</p>
      ) : playing ? (
        <>
          <p>
            {track!.songUrl ? (
              <a href={track!.songUrl} target="_blank" rel="noreferrer">
                {track!.title}
              </a>
            ) : (
              track!.title
            )}
          </p>
          <p className={styles.a}>{track!.artist}</p>
          <p className={styles.m}>via spotify</p>
        </>
      ) : (
        <p className={styles.m}>quiet</p>
      )}
    </div>
  );
}
