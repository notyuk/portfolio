import styles from "@/app/page.module.css";

export default function Mascot() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/mascot.gif"
      alt=""
      aria-hidden="true"
      className={styles.mascot}
    />
  );
}
