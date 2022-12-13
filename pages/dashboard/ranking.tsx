import { m, Variants } from "framer-motion";
import Head from "next/head";
import { ReactElement } from "react";
import DashLayout from "../../layouts/DashLayout";

function Dashboard() {
  return (
    <>
      <Head>
        <title>Ranking - InvestBot</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-start py-2">
        <m.div
          className="grid w-[90vw] grid-cols-1 py-2 sm:grid-cols-2 md:grid-cols-4 lg:w-[75vw]"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <m.div
            className="col-span-1 flex w-full items-center justify-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text pt-[200px] pb-[100px] font-plusJakarta text-transparent sm:col-span-2 md:col-span-4"
            variants={headerVariants}
          >
            <m.h1 className="text-6xl">rankings</m.h1>
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
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 1.0,
      type: "spring",
      bounce: 0.5,
      stiffness: 80,
    },
  },
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashLayout>{page}</DashLayout>;
};

export default Dashboard;
