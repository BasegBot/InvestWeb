import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  [key: string]: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const sortBy = req.query.s ? (req.query.s as string) : undefined;

  let data = fakeData;
  if (sortBy) {
    if (sortBy === "netWorth") {
      data = data.sort((a, b) => b.netWorth - a.netWorth);
    } else if (sortBy === "dailyChange") {
      data = data.sort((a, b) => b.dailyChange - a.dailyChange);
    } else if (sortBy === "dailyChangePercent") {
      data = data.sort((a, b) => b.dailyChangePercent - a.dailyChangePercent);
    } else if (sortBy === "shares") {
      data = data.sort((a, b) => b.shares - a.shares);
    } else if (sortBy === "points") {
      data = data.sort((a, b) => b.points - a.points);
    } else if (sortBy === "name") {
      data = data.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  res.status(200).json({ data });
}

interface fakeDataEntry {
  id: number;
  name: string;
  netWorth: number;
  points: number;
  shares: number;
  dailyChange: number;
  dailyChangePercent: number;
}

const fakeData: fakeDataEntry[] = [
  {
    id: 4,
    name: "3zachm",
    netWorth: 10030, // stocks + points
    points: 70, /// uninvested points
    shares: 20,
    dailyChange: -500,
    dailyChangePercent: -0.523,
  },
  {
    id: 1,
    name: "ModulatingForce",
    netWorth: 142910,
    points: 10020,
    shares: 200,
    dailyChange: 5420,
    dailyChangePercent: 0.14,
  },
  {
    id: 2,
    name: "notohh",
    netWorth: 153495392,
    points: 10020,
    shares: 2432,
    dailyChange: 0,
    dailyChangePercent: 0,
  },
  {
    id: 3,
    name: "SecondSock",
    netWorth: 153495,
    points: 15020,
    shares: 20,
    dailyChange: 5432,
    dailyChangePercent: 0.104,
  },
  {
    id: 0,
    name: "Ente",
    netWorth: 429481824,
    points: 1002022,
    shares: 94214,
    dailyChange: 3294444224,
    dailyChangePercent: 0.94,
  },
  {
    id: 5,
    name: "ObnoxiouslyLongNameWICKED",
    netWorth: 0,
    points: 100,
    shares: 0,
    dailyChange: 0,
    dailyChangePercent: 0,
  },
  {
    id: 6,
    name: "User",
    netWorth: 0,
    points: 100,
    shares: 0,
    dailyChange: 0,
    dailyChangePercent: 0,
  },
  {
    id: 7,
    name: "User",
    netWorth: 0,
    points: 100,
    shares: 0,
    dailyChange: 0,
    dailyChangePercent: 0,
  },
  {
    id: 8,
    name: "User",
    netWorth: 0,
    points: 100,
    shares: 0,
    dailyChange: 0,
    dailyChangePercent: 0,
  },
  {
    id: 9,
    name: "User",
    netWorth: 0,
    points: 100,
    shares: 0,
    dailyChange: 0,
    dailyChangePercent: 0,
  },
  {
    id: 10,
    name: "User",
    netWorth: 0,
    points: 100,
    shares: 0,
    dailyChange: 0,
    dailyChangePercent: 0,
  },
  {
    id: 11,
    name: "User",
    netWorth: 0,
    points: 100,
    shares: 0,
    dailyChange: 0,
    dailyChangePercent: 0,
  },
  {
    id: 12,
    name: "User",
    netWorth: 0,
    points: 100,
    shares: 0,
    dailyChange: 0,
    dailyChangePercent: 0,
  },
  {
    id: 13,
    name: "User",
    netWorth: 0,
    points: 100,
    shares: 0,
    dailyChange: 0,
    dailyChangePercent: 0,
  },
  {
    id: 14,
    name: "User",
    netWorth: 0,
    points: 100,
    shares: 0,
    dailyChange: 0,
    dailyChangePercent: 0,
  },
  {
    id: 15,
    name: "User",
    netWorth: 0,
    points: 100,
    shares: 0,
    dailyChange: 0,
    dailyChangePercent: 0,
  },
  {
    id: 16,
    name: "User",
    netWorth: 0,
    points: 100,
    shares: 0,
    dailyChange: 0,
    dailyChangePercent: 0,
  },
  {
    id: 17,
    name: "User",
    netWorth: 0,
    points: 100,
    shares: 0,
    dailyChange: 0,
    dailyChangePercent: 0,
  },
];

export type { fakeDataEntry };
