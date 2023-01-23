import type { NextApiRequest, NextApiResponse } from "next";
import { createRedisInstance } from "../../../misc/redis";
import { getChannelEmotes, getGlobalEmotes } from "../../../misc/TwitchAPI";

type Data = {
  [key: string]: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const redis = createRedisInstance();
  if (!redis) {
    res.status(500).json({
      error: { message: "Internal API is down", code: 50100 },
    });
    return;
  }

  try {
    const channel = req.query.c
      ? (await getChannelEmotes(redis, req.query.c as string)).data
      : undefined;
    const global = (await getGlobalEmotes(redis)).data;
    redis.quit();
    res.status(200).json({ channel, global });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: { message: "Twitch or internal API is down", code: 10100 },
    });
  }
}
