import Redis from "ioredis";

async function applyCache(
  redis: Redis,
  key: string,
  query: string,
  gql: boolean,
  cacheTime: number
) {
  if (await redis.get(key)) {
    return JSON.parse((await redis.get(key)) as string);
  } else {
    const response = await fetchEndpoint(redis, query, gql);
    if (response != null) {
      await redis.set(key, JSON.stringify(response), "EX", cacheTime);
    }
    return response;
  }
}

async function fetchEndpoint(
  redis: Redis,
  query: string,
  gql: boolean = false
) {
  if (await redis.get("7TV.RATE_LIMIT")) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } else {
    await redis.set("7TV.RATE_LIMIT", "1", "EX", 1);
  }
  if (gql) {
    const response = await fetchGQL(query);
    const json = response.data;
    return json;
  } else {
    const response = await fetch(query);
    const json = await response.json();
    return json;
  }
}

async function fetchGQL(query: string) {
  const response = await fetch("https://7tv.io/v3/gql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
    }),
  });
  const json = await response.json();
  return json;
}

async function getGlobalEmotes(redis: Redis) {
  const gqlQuery = `query {
        namedEmoteSet(name: GLOBAL) {
            emote_count
            emotes {
                flags
                id
                name
                data {
                    animated
                    flags
                    id
                    name
                    tags
                    host {
                        files {
                            format
                            height
                            width
                            name
                            size
                        }
                        url
                    }
                }
            }
        }
    }`;
  return await applyCache(redis, "7TV.GLOBAL_EMOTES", gqlQuery, true, 3600);
}

async function getChannelEmotes(redis: Redis, channelID: string) {
  const gqlQuery = `query {
        user(id: "${channelID}") {
            emote_sets {
                emote_count
                emotes(origins: true) {
                    flags
                    id
                    name
                    data {
                        animated
                        flags
                        id
                        name
                        tags
                        host {
                            files {
                                format
                                height
                                width
                                name
                                size
                            }
                            url
                        }
                    }
                }
            }
        }
    }`;
  return await applyCache(
    redis,
    "7TV.CHANNEL_EMOTES_" + channelID,
    gqlQuery,
    true,
    1200
  );
}

export { getGlobalEmotes, getChannelEmotes };
