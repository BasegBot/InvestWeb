import Link from "next/link";
import { useState, Fragment } from "react";
import { NavTemplate } from "../../layouts/NavTemplates";
import Image from "next/image";
import { AnimatePresence, m, Variants } from "framer-motion";

interface NavProps {
  options: NavTemplate[];
}

function NavBar({ options }: NavProps) {
  const [navList, setNavList] = useState(options);
  const [isActive, setActive] = useState(false);
  return (
    <m.div
      className="pointer-events-none fixed inline-grid w-screen grid-cols-2 bg-zinc-900 font-plusJakarta text-2xl lg:grid-cols-3"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <m.div
        className="mr-auto flex flex-row items-center justify-center px-2 pt-5 pb-5 sm:p-7"
        variants={itemVariants}
      >
        <m.div className="ml-4 mr-4 sm:m-0" variants={logoContainerVariants}>
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
          <h1
            className="flex cursor-pointer flex-row items-center justify-center sm:hidden"
            onClick={() => {
              setActive(!isActive);
            }}
          >
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
          animate={{ rotate: isActive ? 180 : 0 }}
          onClick={() => {
            setActive(!isActive);
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
        variants={itemVariants}
      >
        {navList.map((nav, index) => (
          <Fragment key={index}>{nav.content}</Fragment>
        ))}
      </m.div>
      <m.div
        className="ml-auto flex flex-row items-center justify-center p-2 sm:p-7"
        variants={itemVariants}
      >
        <p className="pointer-events-auto select-none pr-5 text-white">
          Login WIP
        </p>
        <div className="h-10 w-10 rounded-full bg-white"></div>
      </m.div>
      <AnimatePresence mode="wait">
        {isActive && (
          <m.div
            // hiddden by default, when active is true, animate in
            className="pointer-events-auto z-10 flex w-screen flex-col items-center overflow-hidden bg-zinc-800 bg-opacity-70 pt-5 backdrop-blur lg:hidden"
            // have it take up the entire screen, animate in by expanding from the bottom of the nav bar to the bottom of the screen
            variants={mobileContainerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {navList.map((nav, index) => (
              <m.div
                key={index}
                className="pointer-events-auto flex w-[90%] flex-row items-center justify-center border-b-[1px] border-zinc-700 p-4"
                variants={mobileItemVariants}
                whileHover={{
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  transition: { duration: 0.2 },
                }}
                onClick={() => {
                  setActive(false);
                }}
              >
                {nav.content}
              </m.div>
            ))}
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}

// nav bar animation, fades in and then animates the children
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
    },
  },
};

// default animation for nav bar items
const itemVariants: Variants = {
  initial: {
    opacity: 0,
    x: 100,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
};

// logo animation
const logoContainerVariants: Variants = {
  initial: {
    scale: 1,
    rotate: 0,
  },
  animate: {
    scale: 1,
    rotate: 360,
    transition: {
      duration: 4,
      type: "spring",
      stiffness: 15,
    },
  },
};

// mobile nav bar container animation
const mobileContainerVariants: Variants = {
  initial: {
    height: 0,
  },
  animate: {
    height: "100vh",
    transition: {
      duration: 0.5,
      staggerChildren: 0.15,
    },
  },
  exit: {
    height: 0,
    transition: {
      duration: 0.3,
    },
  },
};

// mobile nav bar item animation
const mobileItemVariants: Variants = {
  initial: {
    opacity: 0,
    y: -150,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      type: "spring",
      bounce: 0.3,
    },
  },
};

export default NavBar;
