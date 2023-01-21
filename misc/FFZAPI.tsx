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
  if (await redis.get("FFZ.RATE_LIMIT")) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } else {
    await redis.set("FFZ.RATE_LIMIT", "1", "EX", 1);
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
    "FFZ.GLOBAL_EMOTES",
    "https://api.frankerfacez.com/v1/set/global",
    3600
  );
}

async function getEmoteSet(redis: RedisInstance, setID: string) {
  return await applyCache(
    redis,
    `FFZ.EMOTE_SET.${setID}`,
    `https://api.frankerfacez.com/v1/set/${setID}`,
    3600
  );
}

export { getGlobalEmotes, getEmoteSet };
