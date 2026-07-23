"use client";

import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";

export type Photo = {
  src: string;
  alt: string;
  from?: { slug: string; title: string };
};

const ROTATION_MS = 5000;

export default function Frames({ photos }: { photos: Photo[] }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % photos.length);
    }, ROTATION_MS);
    return () => clearInterval(interval);
  }, [photos.length]);

  if (photos.length === 0) return null;

  const current = photos[idx];
  const total = photos.length;

  return (
    <div className={styles.frames}>
      <h2>frames</h2>

      <div className={styles.framesFrame}>
        {photos.map((photo, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={photo.src + i}
            src={photo.src}
            alt={photo.alt}
            className={styles.framesImg}
            style={{ opacity: i === idx ? 1 : 0 }}
          />
        ))}
        <div className={styles.framesDither} aria-hidden />
      </div>

      <p className={styles.framesCap}>
        {current.from ? (
          <>
            from <a href={`/blog/${current.from.slug}`}>{current.from.title}</a>
          </>
        ) : (
          <>{current.alt || "untitled"}</>
        )}
      </p>
      <p className={styles.framesIdx}>
        {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>
    </div>
  );
}
