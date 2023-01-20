import type { NextApiRequest, NextApiResponse } from "next";
import { createRedisInstance } from "../../../misc/redis";
import { getChannelEmotes, getGlobalEmotes } from "../../../misc/7TVAPI";

type Data = {
  [key: string]: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const redis = createRedisInstance();

  try {
    const channel = req.query.c
      ? await getChannelEmotes(redis, req.query.c as string)
      : undefined;
    const global = await getGlobalEmotes(redis);
    redis.quit();
    res.status(200).json({ channel, global });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: { message: "7TV or internal API is down", code: 10000 } });
  }
}
