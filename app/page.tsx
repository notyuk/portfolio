import Moonscape from "@/components/Moonscape";
import WeatherFX from "@/components/WeatherFX";
import Signal from "@/components/Signal";
import Frames from "@/components/Frames";
import Vitals from "@/components/Vitals";
import GlitchText from "@/components/GlitchText";
import Guestbook from "@/components/Guestbook";
import { getAllPosts, getAllPhotos, pad, shortDate } from "@/lib/posts";
import styles from "./page.module.css";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const posts = getAllPosts();
  const latest = posts.slice(0, 4);
  const total = posts.length;

  const photos = getAllPhotos();

  const session = Math.random().toString(16).slice(2, 6);

  const params = await searchParams;
  const modkeyParam = params.modkey;
  const modkey = Array.isArray(modkeyParam) ? modkeyParam[0] : modkeyParam;

  return (
    <main className={styles.root}>
      <h2 className={styles.sr}>
        yuksel koc — personal homepage. writing, signal, and links.
      </h2>

      <div className={styles.poster}>
        <Moonscape className={styles.art} />
        <WeatherFX className={styles.stars} />

        <span className={`${styles.corner} ${styles.cornerTl}`} aria-hidden="true">+</span>
        <span className={`${styles.corner} ${styles.cornerTr}`} aria-hidden="true">+</span>
        <span className={`${styles.corner} ${styles.cornerBl}`} aria-hidden="true">+</span>
        <span className={`${styles.corner} ${styles.cornerBr}`} aria-hidden="true">+</span>

        <div className={styles.tl}>
          session {session}
          <Vitals />
        </div>
        <div className={styles.tr}>
          <GlitchText
            text="記憶なんてただの記録。書き換えてしまえばいい。 "
            className={styles.tag}
          />
          <p className={styles.p}>no. {pad(total)}</p>
        </div>

        <div className={styles.id}>
          <h1>y.koc / notyuk</h1>
          <p>
            personal projects
            {" "}
            <em>
            i write about things sometimes. it's fun
            </em>
          </p>
        </div>

        <div className={styles.write}>
          <h2>writing —</h2>
          <ol>
            {latest.map((post, i) => (
              <li key={post.slug}>
                <span className={styles.n}>{pad(total - i)}</span>
                <a href={`/blog/${post.slug}`}>{post.title}</a>
                <span className={styles.d}>{shortDate(post.date)}</span>
              </li>
            ))}
          </ol>
          <a href="/blog" className={styles.more}>
            all entries
          </a>
        </div>

        <Signal />
        <Frames photos={photos} />
        <Guestbook modkey={modkey} />

        <div className={styles.links}>
          <div className={styles.nav}>
            <a href="mailto:ykoch006@gmail.com">mail</a>
            <a href="https://github.com/notyuk" target="_blank" rel="noreferrer">
              node
            </a>
            <a href="/rss.xml">feed</a>
            <a href="#guestbook">book</a>
          </div>
          <div className={styles.end}>
            ◼ <em>hello</em> hi
          </div>
        </div>
      </div>
    </main>
  );
}
