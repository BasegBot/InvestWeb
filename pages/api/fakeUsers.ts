import type { NextApiRequest, NextApiResponse } from "next";
import { createRedisInstance } from "../../misc/redis";
import { getUserByName } from "../../misc/TwitchAPI";
import { fakePrices } from "./fakePrices";

type Data = {
  [key: string]: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const username = req.query.u ? (req.query.u as string) : undefined;
  const sortBy = req.query.s ? (req.query.s as string) : undefined;
  const sortAsc = req.query.a ? (req.query.a as string) : undefined;

  const redis = createRedisInstance();

  let data = fakeData;
  // calculate all net worths
  data = data.map((user) => {
    return {
      ...user,
      net_worth:
        user.points +
        user.assets.reduce(
          (a, b) => a + b.count * (fakePrices[b.name] ?? 0),
          0
        ),
    };
  });
  // calculate ranking based on net worth
  data = data.sort((a, b) => (b.net_worth ?? 0) - (a.net_worth ?? 0));
  data = data.map((user, i) => {
    return {
      ...user,
      rank: i + 1,
      // calculate total assets held (shares)
      shares: user.assets.reduce((a, b) => a + b.count, 0),
      // sort users badges by priority
      badges: (user.badges ?? []).sort((a, b) => b.priority - a.priority ?? 0),
      // sort users assets by total value
      assets: user.assets.sort(
        (a, b) =>
          (fakePrices[b.name] ?? 0) * b.count -
          (fakePrices[a.name] ?? 0) * a.count
      ),
    };
  });

  // if username is specified, only return that user
  if (username) {
    // if user does not exist, return error
    data = data.filter((u) => u.name === username);
    if (data.length === 0) {
      res
        .status(404)
        .json({ error: { message: "User not found", code: 20000 } });
      return;
    }
    // get twitch data for user
    let twitchData: { data: { [key: string]: any }[] };
    try {
      twitchData = await getUserByName(redis, username);
    } catch (e) {
      res.status(500).json({
        error: { message: "Twitch or internal API is down", code: 10100 },
      });
      return;
    }
    // if data is empty, user does not exist
    if (twitchData.data.length === 0) {
      // temp who cares
      twitchData.data[0] = {};
      twitchData.data[0].profile_image_url = "/img/logo.webp";
    }
    // add users profile picture url
    data = data.map((u) => {
      return {
        ...u,
        avatar_url: twitchData.data[0].profile_image_url ?? "",
      };
    });
    res.status(200).json({ data: data[0] });
    return;
  }
  if (sortBy) {
    if (sortBy === "daily_change") {
      data = data.sort((a, b) => b.daily_change - a.daily_change);
    } else if (sortBy === "daily_change_percent") {
      data = data.sort(
        (a, b) => b.daily_change_percent - a.daily_change_percent
      );
    } else if (sortBy === "shares") {
      data = data.sort((a, b) => (b.shares ?? 0) - (a.shares ?? 0));
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
  res.status(200).json({ data: data });
}

interface asset {
  name: string;
  count: number;
  provider: "7tv" | "bttv" | "ffz" | "ttv";
}
interface fakeDataEntry {
  id: number;
  name: string;
  points: number;
  daily_change: number;
  daily_change_percent: number;
  assets: asset[];
  net_worth?: number;
  shares?: number;
  avatar_url?: string;
  badges?: badge[];
}

interface badge {
  name: string;
  color: string;
  priority: number;
}

const adminBadge: badge = {
  name: "Admin",
  color: "#CC3333",
  priority: 99999,
};

const CEOBadge: badge = {
  name: "CEO",
  color: "#F97316",
  priority: 100000,
};

const webDevBadge: badge = {
  name: "Web Dev",
  color: "#a855f7",
  priority: 50000,
};

const botDevBadge: badge = {
  name: "Bot Dev",
  color: "#48b2f1",
  priority: 50001,
};

const fakeData: fakeDataEntry[] = [
  {
    id: 4,
    name: "3zachm",
    points: 7420, // uninvested points
    daily_change: -500,
    daily_change_percent: -0.0498504486540378863409770687936,
    assets: [
      {
        name: "JIGACHAD",
        count: 420,
        provider: "7tv",
      },
      {
        name: "annykiss",
        count: 8,
        provider: "7tv",
      },
      {
        name: "HUH",
        count: 1,
        provider: "7tv",
      },
      {
        name: "annytfSigh",
        count: 1,
        provider: "ttv",
      },
      {
        name: "GabeN",
        count: 3,
        provider: "bttv",
      },
      {
        name: "widepeepoBlanket",
        count: 1,
        provider: "ffz",
      },
      {
        name: "plink",
        count: 1,
        provider: "7tv",
      },
    ],
    badges: [adminBadge, webDevBadge],
  },
  {
    id: 1,
    name: "ModulatingForce",
    points: 10020,
    daily_change: 5420,
    daily_change_percent: 0.0379259673920649359736897347981,
    assets: [
      {
        name: "OhTheMiseryEverybodyWantsToBeMyEnemySpareTheSympathyEverybodyWantsToBeMyEnemy-y-y-y-y",
        count: 39,
        provider: "7tv",
      },
      {
        name: "Clueless",
        count: 727,
        provider: "7tv",
      },
      {
        name: "AnnySilly",
        count: 4,
        provider: "bttv",
      },
      {
        name: "annytfHeart",
        count: 98,
        provider: "ttv",
      },
      {
        name: "Catge",
        count: 4,
        provider: "ffz",
      },
    ],
    badges: [adminBadge, botDevBadge],
  },
  {
    id: 2,
    name: "notohh",
    points: 10020,
    daily_change: 0,
    daily_change_percent: 0,
    assets: [
      {
        name: "YourMom",
        count: 81,
        provider: "7tv",
      },
      {
        name: "CumTime",
        count: 92,
        provider: "7tv",
      },
      {
        name: "KissaVei",
        count: 1,
        provider: "bttv",
      },
      {
        name: "SNIFFA",
        count: 1219,
        provider: "7tv",
      },
      {
        name: "FeelsBirthdayMan",
        count: 1,
        provider: "ffz",
      },
      {
        name: "annytfRave",
        count: 5,
        provider: "ttv",
      },
    ],
    badges: [adminBadge, botDevBadge],
  },
  {
    id: 3,
    name: "SecondSockSan",
    points: 15020,
    daily_change: -10432,
    daily_change_percent: -0.06796312583471774324896576435715,
    assets: [
      {
        name: "AYAYAjam",
        count: 46,
        provider: "7tv",
      },
      {
        name: "GabeN",
        count: 3,
        provider: "bttv",
      },
      {
        name: "ThisStream",
        count: 210,
        provider: "7tv",
      },
      {
        name: "BAND",
        count: 91,
        provider: "7tv",
      },
      {
        name: "annytfMelt",
        count: 16,
        provider: "ttv",
      },
    ],
    badges: [CEOBadge, adminBadge],
  },
  {
    id: 0,
    name: "mzntori",
    points: 922022,
    daily_change: 329444422,
    daily_change_percent: 4.2932124926634939999741296760186,
    assets: [
      {
        name: "peepoSnow",
        count: 72,
        provider: "7tv",
      },
      {
        name: "annyHop",
        count: 61,
        provider: "bttv",
      },
      {
        name: "annyExcitedHug",
        count: 26,
        provider: "7tv",
      },
      {
        name: "AAAA",
        count: 65,
        provider: "7tv",
      },
      {
        name: "peepoWTF",
        count: 60,
        provider: "ffz",
      },
      {
        name: "annytfAngy",
        count: 90,
        provider: "ttv",
      },
    ],
    badges: [adminBadge, botDevBadge],
  },
  {
    id: 5,
    name: "luckytohavefoundyou14252",
    points: 423,
    daily_change: 9,
    daily_change_percent: 0.00112163509471585244267198404786,
    assets: [
      {
        name: "HACKERMANS",
        count: 59,
        provider: "7tv",
      },
      {
        name: "THIS",
        count: 70,
        provider: "7tv",
      },
      {
        name: "lebronJAM",
        count: 66,
        provider: "7tv",
      },
    ],
  },
  {
    id: 6,
    name: "ZeroxZerich",
    points: 88542,
    daily_change: -10219,
    daily_change_percent: -0.01213384153219582279533121979601,
    assets: [
      {
        name: "WeebRun",
        count: 10,
        provider: "7tv",
      },
      {
        name: "annySaur",
        count: 7,
        provider: "bttv",
      },
      {
        name: "BAND",
        count: 49,
        provider: "7tv",
      },
      {
        name: "SNIFFA",
        count: 78,
        provider: "7tv",
      },
      {
        name: "PepegaPhone",
        count: 142,
        provider: "ffz",
      },
      {
        name: "annytfHug",
        count: 19,
        provider: "ttv",
      },
    ],
  },
  {
    id: 7,
    name: "joeeyo",
    points: 99979,
    daily_change: 1,
    daily_change_percent: 0.0000001,
    assets: [
      {
        name: "Siti",
        count: 32,
        provider: "7tv",
      },
      {
        name: "annytfLUL",
        count: 9,
        provider: "ttv",
      },
      {
        name: "peepoSnow",
        count: 37,
        provider: "7tv",
      },
      {
        name: "MadgeJuice",
        count: 70,
        provider: "7tv",
      },
      {
        name: "annyBlankies",
        count: 88,
        provider: "bttv",
      },
      {
        name: "TWINGO",
        count: 98,
        provider: "ffz",
      },
    ],
  },
  {
    id: 8,
    name: "dd_maru",
    points: 208421,
    daily_change: 85192,
    daily_change_percent: 0.00824830823607984221402284047097,
    assets: [
      {
        name: "BocchiPossessed",
        count: 56,
        provider: "7tv",
      },
      {
        name: "toffeeConfused",
        count: 64,
        provider: "7tv",
      },
      {
        name: "annytfBanana",
        count: 15,
        provider: "bttv",
      },
      {
        name: "ewLeague",
        count: 64,
        provider: "7tv",
      },
      {
        name: "annytfPain",
        count: 37,
        provider: "ttv",
      },
    ],
  },
  {
    id: 9,
    name: "Goldeneye128",
    points: 6521,
    daily_change: -1942,
    daily_change_percent: -0.03331503465312564331297605160228,
    assets: [
      {
        name: "PagMan",
        count: 52,
        provider: "7tv",
      },
      {
        name: "CapybaraStare",
        count: 47,
        provider: "7tv",
      },
      {
        name: "GabeN",
        count: 52,
        provider: "bttv",
      },
      {
        name: "GroupWankge",
        count: 38,
        provider: "7tv",
      },
      {
        name: "annyCucumber",
        count: 90,
        provider: "7tv",
      },
      {
        name: "annytfKnuckles",
        count: 2,
        provider: "ttv",
      },
    ],
  },
  {
    id: 10,
    name: "lilpastatv",
    points: 40,
    daily_change: 921821,
    daily_change_percent: 0.12577857662228222197571019682439,
    assets: [
      {
        name: "Wigglecat",
        count: 205,
        provider: "7tv",
      },
      {
        name: "guraWink",
        count: 5,
        provider: "7tv",
      },
      {
        name: "annyPls",
        count: 5,
        provider: "bttv",
      },
      {
        name: "golive",
        count: 46,
        provider: "7tv",
      },
      {
        name: "COPIUM",
        count: 82,
        provider: "ffz",
      },
      {
        name: "annytfCheer",
        count: 54,
        provider: "ttv",
      },
    ],
  },
  {
    id: 11,
    name: "domiswitch",
    points: 5002,
    daily_change: 2429,
    daily_change_percent: 0.05610995610995610995610995610996,
    assets: [
      {
        name: "peepoFlute",
        count: 81,
        provider: "7tv",
      },
      {
        name: "WhoAsked",
        count: 44,
        provider: "7tv",
      },
      {
        name: "pL",
        count: 24,
        provider: "7tv",
      },
      {
        name: "peepoSnow",
        count: 13,
        provider: "7tv",
      },
      {
        name: "annytfBlink",
        count: 10,
        provider: "bttv",
      },
      {
        name: "annytfBonk",
        count: 77,
        provider: "ttv",
      },
    ],
  },
  {
    id: 12,
    name: "minosura",
    points: 32901,
    daily_change: 94821,
    daily_change_percent: 0.10485244291894091524314186887943,
    assets: [
      {
        name: "Okayeg",
        count: 100,
        provider: "7tv",
      },
      {
        name: "burh",
        count: 100,
        provider: "7tv",
      },
      {
        name: "annyHop",
        count: 16,
        provider: "bttv",
      },
      {
        name: "AndKnuckles",
        count: 17,
        provider: "ffz",
      },
      {
        name: "yoshiJAM",
        count: 67,
        provider: "7tv",
      },
      {
        name: "WhoAsked",
        count: 59,
        provider: "7tv",
      },
      {
        name: "annytfSit",
        count: 53,
        provider: "ttv",
      },
    ],
  },
  {
    id: 13,
    name: "scienceteam_member",
    points: 958,
    daily_change: -7964,
    daily_change_percent: -0.22823408035765461110792686421734,
    assets: [
      {
        name: "LULE",
        count: 43,
        provider: "7tv",
      },
      {
        name: "Madgeclap",
        count: 82,
        provider: "7tv",
      },
      {
        name: "annyDFast",
        count: 22,
        provider: "bttv",
      },
      {
        name: "PeepoKittyHug",
        count: 7,
        provider: "7tv",
      },
    ],
  },
  {
    id: 14,
    name: "witchdev",
    points: 8532,
    daily_change: -421,
    daily_change_percent: -0.0000044605531984433792422085896,
    assets: [
      {
        name: "SNIFFA",
        count: 76,
        provider: "7tv",
      },
      {
        name: "annyCD",
        count: 62,
        provider: "7tv",
      },
      {
        name: "annyBlankies",
        count: 74,
        provider: "bttv",
      },
      {
        name: "anyatf",
        count: 24,
        provider: "7tv",
      },
      {
        name: "annytfGamba",
        count: 32,
        provider: "ttv",
      },
    ],
  },
  {
    id: 15,
    name: "justone123879",
    points: 86333,
    daily_change: 53289,
    daily_change_percent: 0.00599485461051669551653183334284,
    assets: [
      {
        name: "Homi",
        count: 9,
        provider: "7tv",
      },
      {
        name: "wideVIBE",
        count: 61,
        provider: "7tv",
      },
      {
        name: "Annie",
        count: 24,
        provider: "bttv",
      },
      {
        name: "Lagging",
        count: 92,
        provider: "7tv",
      },
      {
        name: "annytfFlower",
        count: 33,
        provider: "ttv",
      },
    ],
  },
  {
    id: 16,
    name: "marcelr_",
    points: 39291,
    daily_change: 1329,
    daily_change_percent: 0.00331976948959480827019776234047,
    assets: [
      {
        name: "peepoStuck",
        count: 91,
        provider: "7tv",
      },
      {
        name: "PokiShare",
        count: 13,
        provider: "7tv",
      },
      {
        name: "VeryBased",
        count: 7,
        provider: "7tv",
      },
      {
        name: "annyHopper",
        count: 24,
        provider: "bttv",
      },
      {
        name: "annytfFlower",
        count: 79,
        provider: "ttv",
      },
    ],
  },
  {
    id: 17,
    name: "fossabot",
    points: 0,
    daily_change: -31042,
    daily_change_percent: -1.5517120719820044988752811797051,
    assets: [
      {
        name: "catbaby",
        count: 41,
        provider: "7tv",
      },
      {
        name: "peepoCat",
        count: 41,
        provider: "7tv",
      },
      {
        name: "plink",
        count: 32,
        provider: "7tv",
      },
      {
        name: "AngelThump",
        count: 41,
        provider: "bttv",
      },
      {
        name: "annytfSad",
        count: 2,
        provider: "ttv",
      },
    ],
  },
  {
    id: 18,
    name: "Headdesking1",
    points: 429,
    daily_change: 0,
    daily_change_percent: 0,
    assets: [
      {
        name: "anyaPls",
        count: 92,
        provider: "7tv",
      },
      {
        name: "toffeeDinkDonk",
        count: 6,
        provider: "7tv",
      },
      {
        name: "SoCute",
        count: 99,
        provider: "7tv",
      },
      {
        name: "annyBlankies",
        count: 42,
        provider: "bttv",
      },
      {
        name: "annytfHeart",
        count: 63,
        provider: "ttv",
      },
    ],
  },
];

export type { fakeDataEntry };
