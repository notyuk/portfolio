import fs from "node:fs";
import path from "node:path";

const DEMOS_DIR = path.join(process.cwd(), "public", "demos");

export type Demo = {
  src: string;
  title: string;
  sizeMb: string;
};

/**
 * Lists any mp3 (or wav/m4a/ogg) file dropped into public/demos/.
 * Filename becomes the title: "01-late-night-idea.mp3" -> "late night idea".
 */
export function getAllDemos(): Demo[] {
  if (!fs.existsSync(DEMOS_DIR)) return [];

  const files = fs
    .readdirSync(DEMOS_DIR)
    .filter((f) => /\.(mp3|wav|m4a|ogg)$/i.test(f))
    .sort();

  return files.map((file) => {
    const { size } = fs.statSync(path.join(DEMOS_DIR, file));
    const title = file
      .replace(/\.[^.]+$/, "")
      .replace(/^\d+[-_.]?\s*/, "")
      .replace(/[-_]/g, " ");
    return {
      src: `/demos/${file}`,
      title,
      sizeMb: (size / (1024 * 1024)).toFixed(1),
    };
  });
}
