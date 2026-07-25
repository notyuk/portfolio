"use client";

import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";

type Album = { id: string; name: string; artist: string; imageUrl: string };

export default function RecentSpins() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchRecent = async () => {
      try {
        const res = await fetch("/api/spotify/recently-played");
        if (!res.ok) throw new Error(`Recently played request failed: ${res.status}`);
        const data = await res.json();
        if (!cancelled) setAlbums(data.albums ?? []);
      } catch {
        if (!cancelled) setAlbums([]);
      }
    };

    fetchRecent();
    const interval = setInterval(fetchRecent, 10 * 60 * 1000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (albums.length === 0) return null;

  const active = selected !== null ? albums[selected] : null;

  return (
    <div className={styles.spinsWrap}>
      <div className={styles.spins}>
        {albums.map((album, i) => (
          <button
            key={album.id}
            type="button"
            className={`${styles.spinRecord} ${selected === i ? styles.spinRecordActive : ""}`}
            onClick={() => setSelected(selected === i ? null : i)}
            aria-label={`${album.name} by ${album.artist}`}
          >
            <span className={styles.spinLabel}>
              {album.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={album.imageUrl} alt="" />
              ) : null}
            </span>
            <span className={styles.spinHole} aria-hidden="true" />
          </button>
        ))}
      </div>
      <p className={styles.spinCaption}>
        {active ? `${active.name} — ${active.artist}` : "recent spins"}
      </p>
    </div>
  );
}
