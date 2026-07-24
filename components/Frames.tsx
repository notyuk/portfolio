"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/app/page.module.css";

export type Photo = {
  src: string;
  alt: string;
  from?: { slug: string; title: string };
};

const ROTATION_MS = 5000;

export default function Frames({ photos }: { photos: Photo[] }) {
  const [idx, setIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoRotate = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (photos.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % photos.length);
    }, ROTATION_MS);
  };

  useEffect(() => {
    startAutoRotate();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos.length]);

  const goTo = (next: number) => {
    setIdx(next);
    startAutoRotate();
  };

  if (photos.length === 0) return null;

  const current = photos[idx];
  const total = photos.length;
  const goPrev = () => goTo((idx - 1 + total) % total);
  const goNext = () => goTo((idx + 1) % total);

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
        {total > 1 && (
          <button
            type="button"
            onClick={goPrev}
            className={styles.framesNav}
            aria-label="previous photo"
          >
            ‹
          </button>
        )}
        {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        {total > 1 && (
          <button
            type="button"
            onClick={goNext}
            className={styles.framesNav}
            aria-label="next photo"
          >
            ›
          </button>
        )}
      </p>
    </div>
  );
}
