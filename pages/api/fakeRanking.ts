import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  [key: string]: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const sortBy = req.query.s ? (req.query.s as string) : undefined;
  const sortAsc = req.query.a ? (req.query.a as string) : undefined;

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
    if (sortAsc === "true") {
      // slow but only needed for temporary fake data anyway
      data = data.reverse();
    }
  }
  // fake loading time
  await new Promise((resolve) =>
    setTimeout(resolve, 250 + Math.random() * 1000)
  );
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
    dailyChangePercent: -0.0498504486540378863409770687936,
  },
  {
    id: 1,
    name: "ModulatingForce",
    netWorth: 142910,
    points: 10020,
    shares: 200,
    dailyChange: 5420,
    dailyChangePercent: 0.0379259673920649359736897347981,
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
    name: "SecondSockSan",
    netWorth: 153495,
    points: 15020,
    shares: 20,
    dailyChange: -10432,
    dailyChangePercent: -0.06796312583471774324896576435715,
  },
  {
    id: 0,
    name: "e__n__t__e",
    netWorth: 429481824,
    points: 1002022,
    shares: 94214,
    dailyChange: 329444422,
    dailyChangePercent: 4.2932124926634939999741296760186,
  },
  {
    id: 5,
    name: "luckytohavefoundyou14252",
    netWorth: 8024,
    points: 423,
    shares: 4,
    dailyChange: 9,
    dailyChangePercent: 0.00112163509471585244267198404786,
  },
  {
    id: 6,
    name: "ZeroxZerich",
    netWorth: 842190,
    points: 88542,
    shares: 532,
    dailyChange: -10219,
    dailyChangePercent: -0.01213384153219582279533121979601,
  },
  {
    id: 7,
    name: "joeeyo",
    netWorth: 10000000,
    points: 9999979,
    shares: 1,
    dailyChange: 1,
    dailyChangePercent: 0.0000001,
  },
  {
    id: 8,
    name: "dd_maru",
    netWorth: 10328421,
    points: 328421,
    shares: 252,
    dailyChange: 85192,
    dailyChangePercent: 0.00824830823607984221402284047097,
  },
  {
    id: 9,
    name: "Goldeneye128",
    netWorth: 58292,
    points: 6521,
    shares: 63,
    dailyChange: -1942,
    dailyChangePercent: -0.03331503465312564331297605160228,
  },
  {
    id: 10,
    name: "lilpastatv",
    netWorth: 7328919,
    points: 40,
    shares: 93,
    dailyChange: 921821,
    dailyChangePercent: 0.12577857662228222197571019682439,
  },
  {
    id: 11,
    name: "domiswitch",
    netWorth: 43290,
    points: 5002,
    shares: 15,
    dailyChange: 2429,
    dailyChangePercent: 0.05610995610995610995610995610996,
  },
  {
    id: 12,
    name: "minosura",
    netWorth: 904328,
    points: 32901,
    shares: 83,
    dailyChange: 94821,
    dailyChangePercent: 0.10485244291894091524314186887943,
  },
  {
    id: 13,
    name: "scienceteam_member",
    netWorth: 34894,
    points: 958,
    shares: 5,
    dailyChange: -7964,
    dailyChangePercent: -0.22823408035765461110792686421734,
  },
  {
    id: 14,
    name: "witchdev",
    netWorth: 94382912,
    points: 8532,
    shares: 329,
    dailyChange: -421,
    dailyChangePercent: -0.0000044605531984433792422085896,
  },
  {
    id: 15,
    name: "justone123879",
    netWorth: 8889123,
    points: 86333,
    shares: 153,
    dailyChange: 53289,
    dailyChangePercent: 0.00599485461051669551653183334284,
  },
  {
    id: 16,
    name: "marcelr_",
    netWorth: 400329,
    points: 39291,
    shares: 52,
    dailyChange: 1329,
    dailyChangePercent: 0.00331976948959480827019776234047,
  },
  {
    id: 17,
    name: "fossabot",
    netWorth: 20005,
    points: 0,
    shares: 1,
    dailyChange: -31042,
    dailyChangePercent: -1.5517120719820044988752811797051,
  },
];

export type { fakeDataEntry };
