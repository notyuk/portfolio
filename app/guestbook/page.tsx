import { getGuestbookEntries, addGuestbookEntry } from "@/lib/guestbook";
import { redis } from "@/lib/redis";
import { revalidatePath } from "next/cache";
import styles from "./guestbook.module.css";

export const metadata = {
  title: "guestbook — yukselkoc",
  description: "leave your name and a note.",
};

async function submitEntry(formData: FormData) {
  "use server";

  if (!redis) return;

  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot) return;

  const name = String(formData.get("name") ?? "").trim().slice(0, 60);
  const comment = String(formData.get("comment") ?? "").trim().slice(0, 500);

  if (!name || !comment) return;

  await addGuestbookEntry(name, comment);
  revalidatePath("/guestbook");
}

function formatDate(ts: number) {
  const d = new Date(ts);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
}

export default async function GuestbookPage() {
  const entries = await getGuestbookEntries();

  return (
    <div className={styles.root}>
      <div className={styles.page}>
        <div className={styles.head}>
          <a href="/" className={styles.home}>← index</a>
          <h1>guestbook</h1>
        </div>
        <p className={styles.sub}>leave your name and a note. it stays here.</p>

        {redis ? (
          <form action={submitEntry} className={styles.form}>
            <input
              type="text"
              name="website"
              autoComplete="off"
              tabIndex={-1}
              className={styles.honeypot}
              aria-hidden="true"
            />
            <input type="text" name="name" placeholder="name" required maxLength={60} />
            <textarea
              name="comment"
              placeholder="say something"
              required
              maxLength={500}
              rows={3}
            />
            <button type="submit">sign</button>
          </form>
        ) : (
          <p className={styles.sub}>signing is offline right now — check back later.</p>
        )}

        <ol className={styles.entries}>
          {entries.length === 0 && (
            <li className={styles.empty}>no entries yet — be the first.</li>
          )}
          {entries.map((entry) => (
            <li key={entry.id}>
              <div className={styles.entryHead}>
                <span className={styles.name}>{entry.name}</span>
                <span className={styles.date}>{formatDate(entry.createdAt)}</span>
              </div>
              <p className={styles.comment}>{entry.comment}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
