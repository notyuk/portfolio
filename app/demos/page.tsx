import { getAllDemos } from "@/lib/demos";
import { pad } from "@/lib/posts";
import DemoList from "@/components/DemoList";
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
          <DemoList demos={demos} />
        )}
      </div>
    </div>
  );
}
