import { m, Variants } from "framer-motion";
import { ReactElement } from "react";
import DashLayout from "../../layouts/DashLayout";

// not very mobile friendly yet
function Dashboard() {
  return (
    <>
      <m.div
        className="inline-grid w-full grid-cols-1 pt-2 pl-2 lg:h-full lg:grid-cols-5 lg:pl-0 lg:pr-2"
        variants={gridContainerVariants}
        initial="initial"
        animate="animate"
      >
        <m.div
          className="col-span-1 m-2 rounded-2xl bg-zinc-800 bg-opacity-70 p-3"
          variants={gridItemVariants}
        >
          1
        </m.div>
        <m.div
          className="col-span-1 row-span-3 m-2 rounded-2xl bg-zinc-800 bg-opacity-70 p-3 lg:col-span-3 lg:row-span-1"
          variants={gridItemVariants}
        >
          2
        </m.div>
        <m.div
          className="col-span-1 m-2 rounded-2xl bg-zinc-800 bg-opacity-80 p-3"
          variants={gridItemVariants}
        >
          3
        </m.div>
        <m.div
          className="col-span-1 row-span-4 m-2 rounded-2xl bg-zinc-800 bg-opacity-70 p-3 lg:col-span-4 lg:row-span-1"
          variants={gridItemVariants}
        >
          4
        </m.div>
        <m.div
          className="col-span-1 m-2 rounded-2xl bg-zinc-800 bg-opacity-70 p-3"
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
  const metaTags = {};
  return <DashLayout metaTags={metaTags}>{page}</DashLayout>;
};

export default Dashboard;
