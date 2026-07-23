import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

  let pingOk = false;
  let pingError: string | null = null;

  if (redis) {
    try {
      await redis.set("debug:ping", Date.now());
      pingOk = true;
    } catch (error) {
      pingError = String(error);
    }
  }

  return NextResponse.json({
    hasUpstashUrl: Boolean(url),
    hasUpstashToken: Boolean(token),
    hasKvUrl: Boolean(kvUrl),
    hasKvToken: Boolean(kvToken),
    urlLooksReal: Boolean(url && url.startsWith("https://") && !url.includes("SENSITIVE")),
    tokenLooksReal: Boolean(token && token.length > 20 && !token.includes("SENSITIVE")),
    redisClientCreated: Boolean(redis),
    pingOk,
    pingError,
  });
}
