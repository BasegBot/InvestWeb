import { m, Variants } from "framer-motion";
import Image from "next/image";
import { ReactElement } from "react";
import HomeLayout from "../layouts/HomeLayout";
import { homeMain } from "../layouts/NavTemplates";

function Team() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
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
            <m.h1 className="text-6xl">people</m.h1>
          </m.div>
          {/* Person 1 */}
          <PersonLeftCard name="ModulatingForce" img="/img/team/force.webp" />
          <PersonRightCard>TBW</PersonRightCard>

          {/* Person 2 */}
          <PersonLeftCard name="Second Sock" img="/img/team/sock.webp" />
          <PersonRightCard>TBW</PersonRightCard>
          {/* Person 3 */}
          <PersonLeftCard name="Ente" img="/img/team/ente.webp" />
          <PersonRightCard>TBW</PersonRightCard>
          {/* Person 4 */}
          <PersonLeftCard name="notohh" img="/img/team/oh.webp" />
          <PersonRightCard>TBW</PersonRightCard>
          {/* Person 5 */}
          <PersonLeftCard name="3zachm" img="/img/team/zach.webp" />
          <PersonRightCard>TBW</PersonRightCard>
        </m.div>
      </div>
    </>
  );
}

const PersonLeftCard = (props: { name: string; img: string }) => {
  return (
    <m.div
      className="mb-5 flex flex-col items-center justify-center"
      variants={leftCardVariants}
    >
      <Image
        className="rounded-full p-3"
        src={props.img}
        width={200}
        height={200}
        alt={"Picture of " + props.name}
      />
      <m.h1 className="font-plusJakarta text-2xl font-semibold">
        {props.name}
      </m.h1>
    </m.div>
  );
};

// takes in children
const PersonRightCard = (props: { children: React.ReactNode }) => {
  return (
    <m.div
      variants={rightCardVariants}
      className="mb-5 flex flex-col items-center justify-center"
    >
      {props.children}
    </m.div>
  );
};

const containerVariants: Variants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 2,
      delayChildren: 0.5,
      staggerChildren: 0.2,
      type: "spring",
      bounce: 0.5,
      stiffness: 80,
    },
  },
};

const leftCardVariants: Variants = {
  initial: {
    opacity: 0,
    x: 100,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
};

const rightCardVariants: Variants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
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

Team.getLayout = function getLayout(page: ReactElement) {
  const metaTags = {
    title: "Team - toffee",
    description: "Meet the team behind toffee",
  };
  return (
    <HomeLayout navOptions={homeMain} metaTags={metaTags}>
      {page}
    </HomeLayout>
  );
};

export default Team;
