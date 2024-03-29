import { m, Variants } from "framer-motion";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const ActiveLink = (props: {
  href: string;
  pageName: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  let styling = "text-white";
  // if first part of path equals the pageName
  if (router.pathname.split("/")[1] === props.pageName) {
    styling = "text-[#a855f7]";
  }
  return (
    <Link href={props.href} className={styling}>
      {props.children}
    </Link>
  );
};

function NavBar() {
  const { data: session } = useSession();
  return (
    <div className="m-3">
      <m.div
        className="flex min-h-[5rem] w-full flex-row items-center justify-between rounded-2xl bg-zinc-800 bg-opacity-70 p-1 lg:h-full lg:w-24 lg:flex-col"
        variants={navContainerVariants}
        initial="initial"
        animate="animate"
      >
        <m.div
          className="flex flex-row items-center justify-center pl-5 lg:flex-col lg:pl-0 lg:pt-5"
          variants={navStripVariants}
        >
          <m.div variants={navIconVariants} className="pr-5 lg:pr-0 lg:pb-3">
            <ActiveLink href="/dashboard" pageName="dashboard">
              <DashIcon />
            </ActiveLink>
          </m.div>
          <m.div
            variants={navIconVariants}
            className="pr-5 lg:pr-0 lg:pt-3 lg:pb-3"
          >
            <ActiveLink href="/ranking" pageName="ranking">
              <RankingIcon />
            </ActiveLink>
          </m.div>
        </m.div>
        <m.div
          className="flex flex-row items-center justify-center pr-5 lg:w-full lg:flex-col lg:pr-0 lg:pb-5"
          variants={navStripVariants}
        >
          <m.div variants={navIconVariants} className="pr-5 lg:pr-0 lg:pb-3">
            <ActiveLink href="/wiki" pageName="wiki">
              <WikiIcon />
            </ActiveLink>
          </m.div>
          {session ? (
            <m.div
              className="pr-5 lg:pr-0 lg:pt-3 lg:pb-3"
              whileHover={{
                color: "#fca311",
              }}
              whileTap={{
                color: "#dd4444",
              }}
              variants={navIconVariants}
              onClick={() => signOut()}
            >
              <p className="cursor-pointer">Log out</p>
            </m.div>
          ) : (
            <m.div
              className="pr-5 lg:pr-0 lg:pt-3 lg:pb-3"
              whileHover={{
                color: "#fca311",
              }}
              variants={navIconVariants}
              onClick={() => signIn()}
            >
              <LogInIcon />
            </m.div>
          )}
          <m.div
            className="fill-white stroke-white lg:pt-3"
            whileHover={{
              color: "#fca311",
            }}
            whileTap={{
              color: "#dd4444",
            }}
          >
            <Link href="/">
              <ExitIcon />
            </Link>
          </m.div>
        </m.div>
      </m.div>
    </div>
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
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 0.9,
      }}
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
        strokeWidth="1"
        stroke="currentColor"
        fill="currentColor"
      />
    </NavSvgWrap>
  );
};

const ExitIcon = () => {
  return (
    <NavSvgWrap>
      <m.path
        d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
        strokeWidth="1"
        stroke="currentColor"
        fill="currentColor"
      />
    </NavSvgWrap>
  );
};

const RankingIcon = () => {
  return (
    <NavSvgWrap>
      <m.path
        d="M7.5 21H2V9h5.5v12zm7.25-18h-5.5v18h5.5V3zM22 11h-5.5v10H22V11z"
        strokeWidth="1"
        stroke="currentColor"
        fill="currentColor"
      />
    </NavSvgWrap>
  );
};

const WikiIcon = () => {
  return (
    <NavSvgWrap>
      <m.path
        d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3 1 9l11 6 9-4.91V17h2V9L12 3z"
        strokeWidth="1"
        stroke="currentColor"
        fill="currentColor"
      />
    </NavSvgWrap>
  );
};

const LogInIcon = () => {
  return (
    <NavSvgWrap>
      <m.path
        d="M11 7 9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"
        strokeWidth="1"
        stroke="currentColor"
        fill="currentColor"
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
    y: 40,
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
