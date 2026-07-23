import { Redis } from "@upstash/redis";

function readEnv(names: string[]): string | undefined {
  for (const name of names) {
    const value = process.env[name];
    if (value) return value;
  }
  return undefined;
}

const url = readEnv(["UPSTASH_REDIS_REST_URL", "KV_REST_API_URL"]);
const token = readEnv(["UPSTASH_REDIS_REST_TOKEN", "KV_REST_API_TOKEN"]);

export const redis = url && token ? new Redis({ url, token }) : null;
