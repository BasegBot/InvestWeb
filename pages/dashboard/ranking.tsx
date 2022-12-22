import { m, Variants } from "framer-motion";
import Head from "next/head";
import { ReactElement, useEffect, useState } from "react";
import DashLayout from "../../layouts/DashLayout";
import { fakeDataEntry } from "../api/fakeRanking";

function Ranking() {
  const [sortBy, setSortBy] = useState("netWorth");
  const [fakeData, setFakeData] = useState([]);

  useEffect(() => {
    fetch(`/api/fakeRanking?s=${sortBy}`)
      .then((res) => res.json())
      .then((data) => {
        setFakeData(data.data);
      });
  }, [sortBy]);

  return (
    <>
      <Head>
        <title>Ranking - InvestBot</title>
      </Head>
      <div className="flex w-full justify-center">
        <m.div
          className="ml-3 flex w-full flex-col items-center justify-start font-spaceMono font-semibold lg:ml-0"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <m.h1
            className="hidden bg-gradient-to-tr from-purple-500 to-purple-100 bg-clip-text py-10 text-center font-plusJakarta text-5xl font-bold text-white text-transparent lg:block lg:text-6xl"
            variants={headerVariants}
          >
            Top Investors
          </m.h1>
          <m.div
            className="inline-grid w-full rounded-t-2xl bg-zinc-800 bg-opacity-70 p-3 pt-4 text-xl backdrop-blur lg:text-2xl"
            variants={rankingCardVariants}
            initial="initial"
            animate="animate"
          >
            <m.div className="inline-grid w-full grid-flow-col grid-cols-[0.75fr_4fr_3fr_2fr] gap-2 border-b-2 border-zinc-400 px-5 pb-3 text-right text-gray-300 md:grid-cols-[0.5fr_4fr_repeat(3,_2fr)_1.5fr]">
              <m.h1 className="text-left md:text-center">#</m.h1>
              <m.h1
                className="overflow-hidden overflow-ellipsis whitespace-nowrap text-left"
                onClick={() => setSortBy("name")}
              >
                Name
              </m.h1>
              <m.h1 onClick={() => setSortBy("netWorth")}>Assets</m.h1>
              <m.h1
                className="hidden md:block"
                onClick={() => setSortBy("points")}
              >
                Points
              </m.h1>
              <m.h1
                className="hidden md:block"
                onClick={() => setSortBy("shares")}
              >
                Shares
              </m.h1>
              <m.h1 onClick={() => setSortBy("dailyChange")}>Daily</m.h1>
            </m.div>
            {
              // TODO: add arrow to show which column is being sorted by and which direction
              fakeData.map((entry: fakeDataEntry, index) => {
                let changeClass = " text-lime-500";
                if (entry.dailyChangePercent < 0) {
                  changeClass = " text-red-500";
                }
                return (
                  <m.div key={entry.id}>
                    <m.div className="inline-grid w-full grid-flow-col grid-cols-[1fr_4fr_3fr_2fr] gap-2 border-b-2 border-zinc-700 px-5 py-2 text-right md:grid-cols-[0.5fr_4fr_repeat(3,_2fr)_1.5fr]">
                      <m.h1 className="text-left md:text-center">
                        {index + 1}
                      </m.h1>
                      <m.h1 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-left">
                        {entry.name}
                      </m.h1>
                      <m.h1>{entry.netWorth.toLocaleString("en-US")}</m.h1>
                      <m.h1 className="hidden md:block">
                        {entry.points.toLocaleString("en-US")}
                      </m.h1>
                      <m.h1 className="hidden md:block">
                        {entry.shares.toLocaleString("en-US")}
                      </m.h1>
                      <m.h1 className={changeClass}>
                        {(
                          Math.round(entry.dailyChangePercent * 1000) / 10
                        ).toFixed(1) + "%"}
                      </m.h1>
                    </m.div>
                  </m.div>
                );
              })
            }
          </m.div>
        </m.div>
      </div>
    </>
  );
}

const containerVariants: Variants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 2,
      delayChildren: 0.5,
      staggerChildren: 0.25,
      type: "spring",
      bounce: 0.5,
      stiffness: 80,
    },
  },
};

const headerVariants: Variants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.0,
      duration: 1.0,
      type: "spring",
      bounce: 0.5,
      stiffness: 60,
    },
  },
};

const rankingCardVariants: Variants = {
  initial: {
    opacity: 0,
    y: 300,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 3,
      delayChildren: 0.5,
      staggerChildren: 0.25,
      type: "spring",
      bounce: 0.5,
      stiffness: 40,
    },
  },
};

Ranking.getLayout = function getLayout(page: ReactElement) {
  return <DashLayout>{page}</DashLayout>;
};

export default Ranking;
