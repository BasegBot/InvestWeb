import { m, Variants } from "framer-motion";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import Loading from "../../components/common/Loading";
import UserJSONEntry from "../../interfaces/UserJSONEntry";
import DashLayout from "../../layouts/DashLayout";

function Ranking() {
  const [sortBy, setSortBy] = useState("netWorth");
  const [sortAsc, setSortAsc] = useState(false);
  const [fakeData, setFakeData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    setDataLoaded(false);
    // fetch data from api on change to sort method
    fetch(`/api/fakeUsers?s=${sortBy}&a=${sortAsc}`)
      .then((res) => res.json())
      .then((data) => {
        setFakeData(data.data);
        setDataLoaded(true);
      });
  }, [sortBy, sortAsc]);

  const SortSVG = (props: { sortType: string; children?: ReactElement }) => {
    // if not current sort, return a line, otherwise return an arrow corresponding to sortAsc
    if (sortBy != props.sortType) {
      return (
        <m.svg
          className="ml-2 h-[12px] w-[12px] md:h-[15px] md:w-[15px] "
          origin="center"
          viewBox="0 0 6 6"
        >
          <m.line
            x1="1"
            y1="3"
            x2="5"
            y2="3"
            stroke="white"
            strokeLinecap="round"
          />
        </m.svg>
      );
    }
    return (
      <m.svg
        className="ml-2 h-[12px] w-[12px] sm:h-[15px] sm:w-[15px]"
        origin="center"
        viewBox="0 0 330 330"
        // if asc, rotate 180
        transform={sortAsc ? "rotate(180)" : ""}
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
      <div className="flex w-full justify-center">
        <div className="ml-3 flex w-full max-w-7xl flex-col items-center justify-start font-plusJakarta font-semibold lg:ml-0">
          {/* hidden if smaller than lg */}
          <m.h1
            className="hidden py-10 text-center text-5xl font-normal text-pink-300 lg:block lg:text-6xl"
            variants={headerVariants}
          >
            top investors
          </m.h1>
          {/* TODO: responsive for extremely skinny displays (i.e. galaxy fold), or really for mobile entirely so info is not lost */}
          <m.div
            className="inline-grid w-full rounded-t-2xl bg-zinc-800 bg-opacity-70 p-3 pt-4 text-sm sm:text-xl"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={rankingCardVariants}
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
                <SortSVG sortType="dailyChangePercent" />
              </div>
            </div>
            {
              // if data is not loaded, loading div
              !dataLoaded ? (
                <m.div
                  className="mt-5 flex h-[100vh] w-full flex-col items-center justify-start"
                  variants={rankingDataContainerVariants}
                >
                  <Loading />
                  <h1 className="my-5">This is fake delay :)</h1>
                </m.div>
              ) : (
                <m.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={rankingDataContainerVariants}
                >
                  {
                    // generate table rows
                    fakeData.map((entry: UserJSONEntry, index: number) => {
                      // if daily change is negative, make it red
                      let changeClass = " text-lime-500";
                      if (entry.daily_change_percent < 0) {
                        changeClass = " text-red-500";
                      }
                      return (
                        <m.div
                          className="inline-grid w-full grid-flow-col grid-cols-[1fr_4fr_3fr_2fr] gap-2 border-b-2 border-zinc-700 px-5 py-2 text-right md:grid-cols-[0.5fr_4fr_repeat(3,_2fr)_1.5fr]"
                          key={entry.id}
                          variants={rankingDataLineVariants}
                        >
                          <h1 className="text-left md:text-center">
                            {index + 1}
                          </h1>
                          <Link
                            href={`/user/${entry.name}`}
                            className="overflow-hidden"
                          >
                            <h1 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-left">
                              {entry.name}
                            </h1>
                          </Link>
                          <h1>{entry.net_worth.toLocaleString("en-US")}</h1>
                          <h1 className="hidden md:block">
                            {entry.points.toLocaleString("en-US")}
                          </h1>
                          <h1 className="hidden md:block">
                            {entry.shares.toLocaleString("en-US")}
                          </h1>
                          <h1 className={changeClass}>
                            {(
                              Math.round(entry.daily_change_percent * 1000) / 10
                            ).toFixed(1) + "%"}
                          </h1>
                        </m.div>
                      );
                    })
                  }
                </m.div>
              )
            }
          </m.div>
        </div>
      </div>
    </>
  );
}

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
      type: "spring",
      bounce: 0.5,
      stiffness: 40,
    },
  },
  exit: {
    opacity: 0,
    y: 175,
    transition: {
      duration: 0.5,
    },
  },
};

const rankingDataContainerVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1.0,
      staggerChildren: 0.045,
    },
  },
  exit: {
    opacity: 0,
    y: 150,
    transition: {
      duration: 0.5,
    },
  },
};

const rankingDataLineVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1.0,
    },
  },
};

Ranking.getLayout = function getLayout(page: ReactElement) {
  const metaTags = {
    title: "Ranking - toffee",
    description: "Top investors on toffee",
  };
  return (
    <DashLayout metaTags={metaTags} navIcon="ranking">
      {page}
    </DashLayout>
  );
};

export default Ranking;
