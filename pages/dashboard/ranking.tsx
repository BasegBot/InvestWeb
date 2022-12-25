import { m, Variants } from "framer-motion";
import Head from "next/head";
import { ReactElement, useEffect, useState } from "react";
import DashLayout from "../../layouts/DashLayout";
import { fakeDataEntry } from "../api/fakeRanking";

function Ranking() {
  const [sortBy, setSortBy] = useState("netWorth");
  const [sortAsc, setSortAsc] = useState(false);
  const [fakeData, setFakeData] = useState([]);

  useEffect(() => {
    // fetch data from api on change to sort method
    fetch(`/api/fakeRanking?s=${sortBy}&a=${sortAsc}`)
      .then((res) => res.json())
      .then((data) => {
        setFakeData(data.data);
      });
  }, [sortBy, sortAsc]);

  const SortSVG = (props: { sortType: string; children?: ReactElement }) => {
    // if not current sort, return a line, otherwise return an arrow corresponding to sortAsc
    if (sortBy != props.sortType) {
      return (
        <m.svg
          className="ml-2"
          origin="center"
          width="15"
          height="15"
          viewBox="0 0 6 6"
          x={0}
          y={0}
        >
          <m.line
            x1="1"
            y1="3"
            x2="5"
            y2="3"
            stroke="white"
            stroke-linecap="round"
          />
        </m.svg>
      );
    }
    return (
      <m.svg
        className="ml-2"
        origin="center"
        width="15"
        height="15"
        viewBox="0 0 330 330"
        x={0}
        y={0}
        // if asc, rotate 180
        animate={{ rotate: sortAsc ? 180 : 0 }}
      >
        <m.path
          d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
          fill="white"
          stroke="white"
          strokeWidth="15"
          strokeLinecap="round"
        />
      </m.svg>
    );
  };

  const setSortMethod = (sortType: string) => {
    // if same sort, toggle asc
    // a change in sort means asc should be false for intuitive behavior
    if (sortBy == sortType) {
      setSortAsc(!sortAsc);
    } else {
      setSortAsc(false);
      setSortBy(sortType);
    }
  };

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
          {/* hidden if smaller than lg */}
          <m.h1
            className="hidden bg-gradient-to-tr from-purple-500 to-purple-100 bg-clip-text py-10 text-center font-plusJakarta text-5xl font-bold text-white text-transparent lg:block lg:text-6xl"
            variants={headerVariants}
          >
            Top Investors
          </m.h1>
          {/* TODO: responsive for extremely skinny displays (i.e. galaxy fold), or really for mobile entirely so info is not lost */}
          <m.div
            className="text-md inline-grid w-full rounded-t-2xl bg-zinc-800 bg-opacity-70 p-3 pt-4 sm:text-xl"
            variants={rankingCardVariants}
            initial="initial"
            animate="animate"
          >
            {/* Column names and arrows */}
            <div className="inline-grid w-full grid-flow-col grid-cols-[0.75fr_4fr_3fr_2fr] gap-2 border-b-2 border-zinc-400 px-5 pb-3 text-right text-gray-300 md:grid-cols-[0.5fr_4fr_repeat(3,_2fr)_1.5fr]">
              <h1 className="text-left md:text-center">#</h1>
              <div
                className="pointer-events-auto flex cursor-pointer flex-row items-center justify-start"
                onClick={() => setSortMethod("name")}
              >
                <h1 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-left">
                  Name
                </h1>
                <SortSVG sortType="name" />
              </div>
              <div
                className="pointer-events-auto flex cursor-pointer flex-row items-center justify-end"
                onClick={() => setSortMethod("netWorth")}
              >
                <h1 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-left">
                  Assets
                </h1>
                <SortSVG sortType="netWorth" />
              </div>
              <div
                className="pointer-events-auto hidden cursor-pointer flex-row items-center justify-end md:flex"
                onClick={() => setSortMethod("points")}
              >
                <h1 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-left">
                  Points
                </h1>
                <SortSVG sortType="points" />
              </div>
              <div
                className="pointer-events-auto hidden cursor-pointer flex-row items-center justify-end md:flex"
                onClick={() => setSortMethod("shares")}
              >
                <h1 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-left">
                  Shares
                </h1>
                <SortSVG sortType="shares" />
              </div>
              <div
                className="pointer-events-auto flex cursor-pointer flex-row items-center justify-end"
                onClick={() => setSortMethod("dailyChangePercent")}
              >
                <h1 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-left">
                  Daily
                </h1>
                <SortSVG sortType="dailyChange" />
              </div>
            </div>
            {
              // generate table rows
              fakeData.map((entry: fakeDataEntry, index) => {
                // if daily change is negative, make it red
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

// entire container page animation
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

// header animation if needed
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

// table container animation
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
