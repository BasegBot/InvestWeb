import type RedisInstance from "ioredis";

async function applyCache(
  redis: RedisInstance,
  key: string,
  query: string,

  cacheTime: number
) {
  if (await redis.get(key)) {
    return JSON.parse((await redis.get(key)) as string);
  } else {
    const response = await fetchEndpoint(redis, query);
    if (response != null) {
      await redis.set(key, JSON.stringify(response), "EX", cacheTime);
    }
    return response;
  }
}

async function fetchEndpoint(redis: RedisInstance, query: string) {
  if (await redis.get("BTTV.RATE_LIMIT")) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } else {
    await redis.set("BTTV.RATE_LIMIT", "1", "EX", 1);
  }

  const requestHeaders = new Headers();
  requestHeaders.append("Content-Type", "application/json");
  requestHeaders.append("User-Agent", "toffee-web/indev");

  const response = await fetch(query, {
    headers: requestHeaders,
  });

  const json = await response.json();
  return json;
}

async function getGlobalEmotes(redis: RedisInstance) {
  return await applyCache(
    redis,
    "BTTV.GLOBAL_EMOTES",
    "https://api.betterttv.net/3/cached/emotes/global",
    3600
  );
}

async function getUserByID(redis: RedisInstance, channelID: string) {
  return await applyCache(
    redis,
    `BTTV.CHANNEL_EMOTES.${channelID}`,
    `https://api.betterttv.net/3/cached/users/twitch/${channelID}`,
    3600
  );
}

export { getGlobalEmotes, getUserByID };
