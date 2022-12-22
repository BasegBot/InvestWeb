import type { NextApiRequest, NextApiResponse } from "next";
import { getChannelEmotes, getGlobalEmotes } from "../../../misc/7TVAPI";

type Data = {
  [key: string]: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const channel = req.query.c
    ? await getChannelEmotes(req.query.c as string)
    : undefined;
  const global = await getGlobalEmotes();

  res.status(200).json({ channel, global });
}
