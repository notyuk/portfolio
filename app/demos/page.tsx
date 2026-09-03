import { getAllDemos } from "@/lib/demos";
import { pad } from "@/lib/posts";
import styles from "./demos.module.css";

export const metadata = {
  title: "demos — yukselkoc",
  description: "song demos.",
};

export default function DemosIndex() {
  const demos = getAllDemos();
  const total = demos.length;

  return (
    <div className={styles.root}>
      <div className={styles.page}>
        <div className={styles.head}>
          <a href="/" className={styles.home}>← index</a>
          <h1>demos / {pad(total)} tracks</h1>
        </div>

        {demos.length === 0 ? (
          <p className={styles.empty}>nothing here yet.</p>
        ) : (
          <ol className={styles.entries}>
            {demos.map((demo, i) => (
              <li key={demo.src}>
                <span className={styles.n}>{pad(total - i)}</span>
                <div className={styles.trackInfo}>
                  <span className={styles.title}>{demo.title}</span>
                  <audio className={styles.player} src={demo.src} controls preload="none" />
                </div>
                <span className={styles.size}>{demo.sizeMb}mb</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
