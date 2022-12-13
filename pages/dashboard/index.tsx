import { m, Variants } from "framer-motion";
import Head from "next/head";
import { ReactElement } from "react";
import DashLayout from "../../layouts/DashLayout";

// not very mobile friendly yet
function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard - InvestBot</title>
      </Head>
      <m.div
        className="inline-grid h-full w-full grid-cols-2 pt-2 pr-2 xl:grid-cols-5"
        variants={gridContainerVariants}
        initial="initial"
        animate="animate"
      >
        <m.div
          className="col-span-1 m-2 bg-zinc-800"
          variants={gridItemVariants}
        >
          1
        </m.div>
        <m.div
          className="col-span-3 m-2 bg-zinc-800"
          variants={gridItemVariants}
        >
          2
        </m.div>
        <m.div
          className="col-span-1 m-2 bg-zinc-800"
          variants={gridItemVariants}
        >
          3
        </m.div>
        <m.div
          className="col-span-4 m-2 bg-zinc-800"
          variants={gridItemVariants}
        >
          4
        </m.div>
        <m.div
          className="col-span-1 m-2 bg-zinc-800"
          variants={gridItemVariants}
        >
          5
        </m.div>
      </m.div>
    </>
  );
}

const gridContainerVariants: Variants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.8,
      staggerChildren: 0.4,
      duration: 1.5,
      type: "spring",
      bounce: 0.5,
      stiffness: 80,
    },
  },
};

const gridItemVariants: Variants = {
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

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashLayout>{page}</DashLayout>;
};

export default Dashboard;
