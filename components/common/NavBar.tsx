import Link from "next/link";
import { useState, Fragment } from "react";
import { NavTemplate } from "../../layouts/NavTemplates";
import Image from "next/image";
import { AnimatePresence, m, Variants } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";

interface NavProps {
  options: NavTemplate[];
}

function NavBar({ options }: NavProps) {
  const [navList, setNavList] = useState(options);
  const [isActive, setActive] = useState(false);
  const [isUserActive, setUserActive] = useState(false);
  const { data: session } = useSession();
  const avatar = session?.user?.image ?? "/img/defaultAvatar.webp";

  return (
    <m.div
      className="pointer-events-none fixed z-50 inline-grid w-screen grid-cols-2 bg-zinc-900 bg-opacity-90 font-plusJakarta text-2xl lg:grid-cols-3"
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
            key="toffeeImg"
            href="/"
            className="pointer-events-auto flex flex-row items-center justify-center"
          >
            <Image
              src="/img/logo.webp"
              alt="toffee logo"
              width={64}
              height={64}
              className="mr-8 rounded-b-full"
            />
          </Link>
        </m.div>
        <div className="pointer-events-auto flex select-none flex-col items-start justify-center pr-2 font-plusJakarta text-white sm:pr-5">
          <Link
            key="toffee"
            href="/"
            className="hidden flex-row items-center justify-center sm:flex"
          >
            toffee
          </Link>
          <h1
            className="mr-3 flex cursor-pointer flex-row items-center justify-center sm:mr-auto sm:hidden"
            onClick={() => {
              setActive(!isActive);
            }}
          >
            toffee
          </h1>
          <p className="hidden text-xs text-gray-400 sm:block">
            Serving anny&apos;s community est. 2022
          </p>
        </div>
        <m.svg
          className="pointer-events-auto mt-2 cursor-pointer lg:hidden"
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
        className="ml-auto flex flex-row items-center justify-center"
        variants={itemVariants}
      >
        {session ? (
          <>
            <div
              onMouseOver={() => setUserActive(true)}
              onMouseLeave={() => setUserActive(false)}
              className="pointer-events-auto relative"
            >
              <div className="pointer-events-auto relative mt-4 flex w-60 flex-row items-center justify-center border-l-2 border-orange-500 bg-zinc-800 p-6">
                <Image
                  src={avatar}
                  alt="avatar"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <span className="text-md mr-5 ml-6 text-gray-400">
                  {session?.user?.name ?? "User"}
                </span>
              </div>
              <AnimatePresence mode="wait">
                <m.div
                  className="pointer-events-auto absolute top-28 z-50 w-60 border-l-2 border-orange-500 bg-zinc-800 pb-3"
                  animate={{
                    opacity: isUserActive ? 1 : 0,
                    x: isUserActive ? 0 : 10,
                    transition: {
                      duration: 0.2,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <div className="flex flex-col items-center justify-center">
                    <Link
                      href={`/user/${session?.user?.name ?? "User"}`}
                      className="flex h-14 w-full flex-row items-center justify-center text-orange-500 hover:bg-zinc-900 hover:text-white"
                    >
                      <span className="text-md text-gray-400">Profile</span>
                    </Link>
                    <div className="flex h-14 items-center justify-center">
                      <button
                        onClick={() => signOut()}
                        className="rounded-md bg-zinc-700 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </m.div>
              </AnimatePresence>
            </div>
          </>
        ) : (
          <div className="pointer-events-auto flex flex-row items-center justify-center px-6">
            <button
              onClick={() => signIn()}
              className="rounded-md bg-zinc-700 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Login
            </button>
          </div>
        )}
      </m.div>
      <AnimatePresence mode="wait">
        {isActive && (
          <m.div
            // hiddden by default, when active is true, animate in
            className="pointer-events-auto z-10 flex w-screen flex-col items-center overflow-hidden bg-zinc-800 bg-opacity-70 pt-5 lg:hidden"
            // have it take up the entire screen, animate in by expanding from the bottom of the nav bar to the bottom of the screen
            variants={mobileContainerVariants}
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
    rotate: -90,
  },
  animate: {
    scale: 1,
    rotate: 0,
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
