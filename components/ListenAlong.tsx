"use client";

import { useState } from "react";
import styles from "@/app/page.module.css";

type Props = {
  title: string;
  artist: string;
  progressMs: number;
  durationMs: number;
  fetchedAt: number;
};

export default function ListenAlong({ title, artist, progressMs, durationMs, fetchedAt }: Props) {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [startSeconds, setStartSeconds] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const openListenAlong = async () => {
    setLoading(true);
    setNotFound(false);
    try {
      const res = await fetch(
        `/api/youtube/search?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`
      );
      const data = await res.json();
      if (!data.videoId) {
        setNotFound(true);
        return;
      }
      const elapsed = Date.now() - fetchedAt;
      const estimatedMs = Math.min(progressMs + elapsed, durationMs || Infinity);
      setStartSeconds(Math.max(0, Math.floor(estimatedMs / 1000)));
      setVideoId(data.videoId);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  if (videoId) {
    return (
      <div className={styles.listenAlongEmbed}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?start=${startSeconds}&autoplay=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="listen along"
        />
      </div>
    );
  }

  return (
    <button type="button" className={styles.listenAlong} onClick={openListenAlong} disabled={loading}>
      {loading ? "finding it…" : notFound ? "couldn't find it" : "▶ listen along"}
    </button>
  );
}
