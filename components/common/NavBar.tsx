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
  return (
    <m.div
      className="font-Manrope pointer-events-none fixed hidden w-screen justify-between p-7 text-2xl sm:flex"
      initial="initial"
      animate="animate"
      variants={containerAnimation}
    >
      <m.div variants={itemAnimation}>
        <Link
          key="InvestBot"
          href="/"
          className="flex flex-row items-center justify-center"
        >
          <m.div
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
            <Image
              src="/img/logo.webp"
              alt="InvestBot Logo"
              width={64}
              height={64}
              className="ml-4 mr-6 rounded-b-full"
            />
          </m.div>
          <p className="pointer-events-auto select-none pr-5 text-white">
            InvestBot
          </p>
        </Link>
      </m.div>
      <m.div
        className="flex flex-row items-center justify-center"
        variants={itemAnimation}
      >
        {navList.map((nav, index) => (
          <Fragment key={index}>{nav.content}</Fragment>
        ))}
      </m.div>
      <m.div
        className="flex flex-row items-center justify-center"
        variants={itemAnimation}
      >
        <p className="pointer-events-auto select-none pr-5 text-white">
          Login blah blah
        </p>
        <div className="h-10 w-10 rounded-full bg-white"></div>
      </m.div>
    </m.div>
  );
}

export default NavBar;
