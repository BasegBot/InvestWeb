import type { NextApiRequest, NextApiResponse } from "next";
import { createRedisInstance } from "../../../misc/redis";
import { getEmoteSet, getGlobalEmotes } from "../../../misc/FFZAPI";

type Data = {
  [key: string]: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const redis = createRedisInstance();

  try {
    const channel = req.query.s
      ? (await getEmoteSet(redis, req.query.s as string)).set.emoticons
      : undefined;
    let global = await getGlobalEmotes(redis);
    // set global emotes to be the three sets within the global object ("3", "4330")
    global = global.sets["3"].emoticons.concat(global.sets["4330"].emoticons);
    redis.quit();
    res.status(200).json({ channel, global });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: { message: "FFZ or internal API is down", code: 10300 } });
  }
}
