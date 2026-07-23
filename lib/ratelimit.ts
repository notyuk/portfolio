import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

export const guestbookRatelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      prefix: "ratelimit:guestbook",
    })
  : null;
