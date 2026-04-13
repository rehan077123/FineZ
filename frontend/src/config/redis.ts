import { Redis } from "@upstash/redis";
import { CONFIG } from "./constants";

// Initialize Upstash Redis client
export const redis = new Redis({
  url: CONFIG.REDIS_URL!,
  token: CONFIG.REDIS_TOKEN!,
});

// Cache helpers
export async function getCached(key: string) {
  try {
    return await redis.get(key);
  } catch (error) {
    console.error("Redis get error:", error);
    return null;
  }
}

export async function setCached(
  key: string,
  value: any,
  ttl: number = 3600
) {
  try {
    await redis.setex(key, ttl, JSON.stringify(value));
  } catch (error) {
    console.error("Redis set error:", error);
  }
}

export async function deleteCached(key: string) {
  try {
    await redis.del(key);
  } catch (error) {
    console.error("Redis delete error:", error);
  }
}

export async function getCachedJSON(key: string) {
  const cached = await getCached(key);
  if (!cached) return null;
  try {
    return JSON.parse(cached as string);
  } catch {
    return null;
  }
}
