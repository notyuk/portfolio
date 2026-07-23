import { getAllPosts, pad, fullDate } from "@/lib/posts";
import styles from "./blog.module.css";

export const metadata = {
  title: "writing — yukselkoc",
  description: "all entries.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const total = posts.length;

  return (
    <div className={styles.root}>
      <div className={styles.page}>
        <div className={styles.head}>
          <a href="/" className={styles.home}>← index</a>
          <h1>writing / {pad(total)} entries</h1>
        </div>

        <ol className={styles.entries}>
          {posts.map((post, i) => (
            <li key={post.slug}>
              <span className={styles.n}>{pad(total - i)}</span>
              <a href={`/blog/${post.slug}`}>{post.title}</a>
              <span className={styles.d}>{fullDate(post.date)}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
