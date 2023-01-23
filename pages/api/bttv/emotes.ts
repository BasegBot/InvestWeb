import type { NextApiRequest, NextApiResponse } from "next";
import { createRedisInstance } from "../../../misc/redis";
import { getUserByID, getGlobalEmotes } from "../../../misc/BTTVAPI";

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
      error: { message: "Internal API is down", code: 50200 },
    });
    return;
  }

  try {
    const channel = req.query.c
      ? (await getUserByID(redis, req.query.c as string)).channelEmotes
      : undefined;
    const global = await getGlobalEmotes(redis);
    redis.quit();
    res.status(200).json({ channel, global });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: { message: "BTTV or internal API is down", code: 10200 },
    });
  }
}
