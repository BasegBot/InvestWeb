// Layout/container used for the main mostly empty landing page, can be used for related pages (credits, about, etc.)

import { AnimatePresence, domAnimation, LazyMotion } from "framer-motion";
import Head from "next/head";
import NavBar from "../components/common/NavBar";
import { NavTemplate } from "./NavTemplates";

interface HomeLayoutProps {
  navOptions: NavTemplate[];
  children: React.ReactNode;
}

function HomeLayout(props: HomeLayoutProps) {
  // get the nav options
  const navOptions = props.navOptions;
  return (
    <>
      <Head>
        <title>InvestBot</title>
        <meta name="description" content="Temporary home :)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LazyMotion features={domAnimation}>
        <AnimatePresence exitBeforeEnter>
          <NavBar options={navOptions} />
        </AnimatePresence>
      </LazyMotion>
      <LazyMotion features={domAnimation}>
        <AnimatePresence exitBeforeEnter>
          <div className="h-screen w-screen">{props.children}</div>
        </AnimatePresence>
      </LazyMotion>
    </>
  );
}

export default HomeLayout;
