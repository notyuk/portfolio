"use server";

import { revalidatePath } from "next/cache";
import { redis } from "./redis";

const TITLES_KEY = "demos:titles";

export async function renameDemoTitleAction(formData: FormData) {
  const key = String(formData.get("modkey") ?? "");
  const adminKey = process.env.GUESTBOOK_ADMIN_KEY;
  if (!adminKey || key !== adminKey) return;

  if (!redis) return;

  const file = String(formData.get("file") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim().slice(0, 100);
  if (!file || !title) return;

  await redis.hset(TITLES_KEY, { [file]: title });
  revalidatePath("/demos");
}
