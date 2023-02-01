import type { NextApiRequest, NextApiResponse } from "next";
import { createRedisInstance } from "../../lib/redis";
import {
  getGlobalEmotes as get7TVGlobalEmotes,
  getChannelEmotes as get7TVChannelEmotes,
} from "../../lib/7TVAPI";
import {
  getGlobalEmotes as getBTTVGlobalEmotes,
  getUserByID as getBTTVUser,
} from "../../lib/BTTVAPI";
import {
  getGlobalEmotes as getFFZGlobalEmotes,
  getEmoteSet as getFFZEmoteSet,
} from "../../lib/FFZAPI";
import {
  getGlobalEmotes as getTwitchGlobalEmotes,
  getChannelEmotes as getTwitchChannelEmotes,
} from "../../lib/TwitchAPI";

type Data = {
  [key: string]: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const redis = createRedisInstance();

  if (!redis) {
    res
      .status(500)
      .json({ error: { message: "Internal API is down", code: 50000 } });
    return;
  }

  try {
    const cachedJSON = await redis.get("ALL_EMOTES");
    if (cachedJSON) {
      const jsonRes = JSON.parse(cachedJSON);
      redis.quit();
      res.status(200).json(jsonRes);
      return;
    }
    const ffzGlobal = await getFFZGlobalEmotes(redis);
    const jsonRes = {
      "7tv": {
        global: (await get7TVGlobalEmotes(redis)).namedEmoteSet.emotes,
        channel: (await get7TVChannelEmotes(redis, "61ad997effa9aba101bcfddf"))
          .user.emote_sets[0].emotes,
      },
      bttv: {
        global: await getBTTVGlobalEmotes(redis),
        channel: (await getBTTVUser(redis, "56418014")).channelEmotes,
      },
      ffz: {
        global: ffzGlobal.sets["3"].emoticons.concat(
          ffzGlobal.sets["4330"].emoticons
        ),
        channel: (await getFFZEmoteSet(redis, "341402")).set.emoticons,
      },
      twitch: {
        global: (await getTwitchGlobalEmotes(redis)).data,
        channel: (await getTwitchChannelEmotes(redis, "56418014")).data,
      },
    };
    // cache emotelist for 20 minutes
    await redis.set("ALL_EMOTES", JSON.stringify(jsonRes), "EX", 1200);
    redis.quit();

    res.status(200).json(jsonRes);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: { message: "Internal Emote API error", code: 10000 } });
  }
}
