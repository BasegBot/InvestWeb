import Link from "next/link";
import { useState, Fragment } from "react";
import { NavTemplate } from "../../layouts/NavTemplates";
import Image from "next/image";
import { m, Variants } from "framer-motion";

interface NavProps {
  options: NavTemplate[];
}

// nav bar animation, fades in and then animates the children
const containerAnimation: Variants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 2,
      delayChildren: 0.5,
      staggerChildren: 0.25,
    },
  },
};

// default animation for nav bar items
const itemAnimation: Variants = {
  initial: {
    opacity: 0,
    x: 100,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
};

function NavBar({ options }: NavProps) {
  const [navList, setNavList] = useState(options);
  const [active, setActive] = useState(false);
  return (
    <m.div
      className="pointer-events-none fixed inline-grid w-screen grid-cols-2 p-2 pt-7 font-plusJakarta text-2xl sm:p-7 lg:grid-cols-3"
      initial="initial"
      animate="animate"
      variants={containerAnimation}
    >
      <m.div
        className="mr-auto flex flex-row items-center justify-center"
        variants={itemAnimation}
      >
        <m.div
          className="ml-4 mr-4 sm:m-0"
          initial={{
            scale: 1,
            rotate: 0,
          }}
          animate={{
            scale: 1,
            rotate: 360,
            transition: {
              duration: 4,
              type: "spring",
              stiffness: 20,
            },
          }}
        >
          <Link
            key="InvestBotImg"
            href="/"
            className="pointer-events-auto flex flex-row items-center justify-center"
          >
            <Image
              src="/img/logo.webp"
              alt="InvestBot Logo"
              width={64}
              height={64}
              className="mr-8 rounded-b-full"
            />
          </Link>
        </m.div>
        <div className="pointer-events-auto flex select-none flex-col items-start justify-center pr-5 font-plusJakarta text-white">
          <Link
            key="InvestBot"
            href="/"
            className="hidden flex-row items-center justify-center sm:flex"
          >
            InvestBot
          </Link>
          <h1 className="flex flex-row items-center justify-center sm:hidden">
            InvestBot
          </h1>
          <p className="hidden text-xs text-gray-400 sm:block">
            Serving anny&apos;s community est. 2022
          </p>
        </div>
        <m.svg
          className="pointer-events-auto cursor-pointer lg:hidden"
          origin="center"
          width="25"
          height="26"
          viewBox="0 0 330 330"
          x={0}
          y={0}
          animate={{ rotate: active ? 180 : 0 }}
          onClick={() => {
            setActive(!active);
            console.log(active);
          }}
        >
          <m.path
            d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
            fill="white"
            stroke="white"
            strokeWidth="15"
            strokeLinecap="round"
          />
        </m.svg>
      </m.div>
      <m.div
        className="mr-auto ml-auto hidden flex-row items-center justify-center lg:flex"
        variants={itemAnimation}
      >
        {navList.map((nav, index) => (
          <Fragment key={index}>{nav.content}</Fragment>
        ))}
      </m.div>
      <m.div
        className="ml-auto flex flex-row items-center justify-center"
        variants={itemAnimation}
      >
        <p className="pointer-events-auto select-none pr-5 text-white">
          Login blah
        </p>
        <div className="h-10 w-10 rounded-full bg-white"></div>
      </m.div>
      <m.div
        // hiddden by default, when active is true, animate in
        className="pointer-events-auto z-10 mt-5 bg-zinc-800 md:max-w-[75%] lg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {navList.map((nav, index) => (
          // TODO: stylize -- I have a flight in 4 hours and its 3:04 am
          <Fragment key={index}>{nav.content}</Fragment>
        ))}
      </m.div>
    </m.div>
  );
}

export default NavBar;
