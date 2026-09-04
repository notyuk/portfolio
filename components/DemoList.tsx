"use client";

import { useState } from "react";
import DemoTrack from "./DemoTrack";
import type { Demo } from "@/lib/demos";
import styles from "@/app/demos/demos.module.css";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function DemoList({
  demos,
  isModerator,
  modkey,
}: {
  demos: Demo[];
  isModerator: boolean;
  modkey?: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const total = demos.length;

  return (
    <ol className={styles.entries}>
      {demos.map((demo, i) => (
        <DemoTrack
          key={demo.src}
          n={pad(total - i)}
          file={demo.file}
          src={demo.src}
          title={demo.title}
          sizeMb={demo.sizeMb}
          dateAdded={demo.dateAdded}
          isActive={active === demo.src}
          onPlay={() => setActive(demo.src)}
          isModerator={isModerator}
          modkey={modkey}
        />
      ))}
    </ol>
  );
}
