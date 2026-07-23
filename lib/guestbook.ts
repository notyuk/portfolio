import { redis } from "./redis";

const GUESTBOOK_KEY = "guestbook:entries";
const MAX_ENTRIES = 500;

export type GuestbookEntry = {
  id: string;
  name: string;
  comment: string;
  createdAt: number;
};

export async function getGuestbookEntries(): Promise<GuestbookEntry[]> {
  if (!redis) return [];
  return redis.lrange<GuestbookEntry>(GUESTBOOK_KEY, 0, MAX_ENTRIES - 1);
}

export async function addGuestbookEntry(name: string, comment: string): Promise<void> {
  if (!redis) throw new Error("Guestbook storage is not configured.");

  const entry: GuestbookEntry = {
    id: crypto.randomUUID(),
    name,
    comment,
    createdAt: Date.now(),
  };

  await redis.lpush(GUESTBOOK_KEY, entry);
  await redis.ltrim(GUESTBOOK_KEY, 0, MAX_ENTRIES - 1);
}
