import RedisInstance from "ioredis";

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

async function authTwitch(redis: RedisInstance) {
  let auth = await redis.get("TWITCH.AUTH");
  if (auth) {
    return auth;
  } else {
    const response = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_SECRET}&grant_type=client_credentials`,
      {
        method: "POST",
      }
    );
    const json = await response.json();
    await redis.set("TWITCH.OAUTH", json.access_token, "EX", json.expires_in);

    return json.access_token;
  }
}

async function fetchEndpoint(redis: RedisInstance, query: string) {
  if (await redis.get("TWITCH.RATE_LIMIT")) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } else {
    await redis.set("TWITCH.RATE_LIMIT", "1", "EX", 1);
  }

  const auth = await authTwitch(redis);

  const requestHeaders = new Headers();
  requestHeaders.append("Client-ID", process.env.TWITCH_CLIENT_ID ?? "");
  requestHeaders.append("Authorization", `Bearer ${auth}`);

  const response = await fetch(query, {
    headers: requestHeaders,
  });
  const json = await response.json();
  return json;
}

async function getUserByName(redis: RedisInstance, username: string) {
  return await applyCache(
    redis,
    "TWITCH.USER_" + username,
    `https://api.twitch.tv/helix/users?login=${username}`,
    600
  );
}

async function getUserByID(redis: RedisInstance, userID: string) {
  return await applyCache(
    redis,
    "TWITCH.USER_" + userID,
    `https://api.twitch.tv/helix/users?id=${userID}`,
    600
  );
}

async function getGlobalEmotes(redis: RedisInstance) {
  return await applyCache(
    redis,
    "TWITCH.GLOBAL_EMOTES",
    `https://api.twitch.tv/helix/chat/emotes/global`,
    3600
  );
}

async function getChannelEmotes(redis: RedisInstance, channelID: string) {
  return await applyCache(
    redis,
    "TWITCH.CHANNEL_EMOTES_" + channelID,
    `https://api.twitch.tv/helix/chat/emotes?broadcaster_id=${channelID}`,
    600
  );
}

export { getUserByName, getUserByID, getGlobalEmotes, getChannelEmotes };
