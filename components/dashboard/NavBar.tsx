import { m, Variants } from "framer-motion";
import Link from "next/link";

function NavBar() {
  return (
    <m.div
      className="mr-2 flex h-full w-24 flex-col items-center justify-between bg-zinc-800 p-1"
      variants={navContainerVariants}
      initial="initial"
      animate="animate"
    >
      <m.div className="flex flex-col pt-5" variants={navStripVariants}>
        <m.div variants={navIconVariants} className="pb-5">
          <Link href="/dashboard">
            <DashIcon />
          </Link>
        </m.div>
        <m.div variants={navIconVariants} className="pb-5">
          <Link href="/dashboard/ranking">
            <RankingIcon />
          </Link>
        </m.div>
      </m.div>
      <m.div
        className="flex w-full flex-col items-center justify-center pb-5"
        variants={navStripVariants}
      >
        <Link href="/">
          <ExitIcon />
        </Link>
      </m.div>
    </m.div>
  );
}

const NavSvgWrap = (props: { children: React.ReactNode }) => {
  return (
    <m.svg
      className="cursor-pointer"
      viewBox="0 0 24 24"
      width="32"
      height="32"
      x={0}
      y={0}
      origin="center"
    >
      {props.children}
    </m.svg>
  );
};

const DashIcon = () => {
  return (
    <NavSvgWrap>
      <m.path
        d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
        fill="white"
        stroke="white"
        strokeWidth="1"
      />
    </NavSvgWrap>
  );
};

const ExitIcon = () => {
  return (
    <NavSvgWrap>
      <m.path
        d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
        fill="white"
        stroke="white"
        strokeWidth="1"
      />
    </NavSvgWrap>
  );
};

const RankingIcon = () => {
  return (
    <NavSvgWrap>
      <m.path
        d="M7.5 21H2V9h5.5v12zm7.25-18h-5.5v18h5.5V3zM22 11h-5.5v10H22V11z"
        fill="white"
        stroke="white"
        strokeWidth="1"
      />
    </NavSvgWrap>
  );
};

const navContainerVariants: Variants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.5,
      duration: 1.0,
      type: "spring",
      bounce: 0.5,
      stiffness: 80,
      delayChildren: 1.25,
      staggerChildren: 0.25,
    },
  },
};

const navStripVariants: Variants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      type: "spring",
      bounce: 0.5,
      stiffness: 80,
      staggerChildren: 0.25,
      delayChildren: 0.1,
    },
  },
};

const navIconVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1.0,
      type: "spring",
      bounce: 0.5,
      stiffness: 80,
    },
  },
};

export default NavBar;
