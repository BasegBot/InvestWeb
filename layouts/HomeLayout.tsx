// Layout/container used for the main mostly empty landing page, can be used for related pages (credits, about, etc.)

import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import NavBar from "../components/common/NavBar";
import { NavTemplate } from "./NavTemplates";

interface HomeLayoutProps {
  navOptions: NavTemplate[];
  children: React.ReactNode;
}

function HomeLayout(props: HomeLayoutProps) {
  // get the nav options
  const navOptions = props.navOptions;
  // get the current route for animation purposes
  const router = useRouter();
  return (
    <>
      <Head>
        <title>InvestBot</title>
        <meta name="description" content="Serving anny's community est. 2022" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#c084fc" />
        <meta property="og:title" content="InvestBot" />
        <meta
          property="og:description"
          content="Serving anny's community est. 2022"
        />
        <meta property="og:image" content="/img/logo.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="InvestBot" />
      </Head>

      <LazyMotion features={domAnimation}>
        <AnimatePresence mode="wait">
          <NavBar options={navOptions} />
        </AnimatePresence>
      </LazyMotion>

      <LazyMotion features={domAnimation}>
        <AnimatePresence mode="wait">
          <m.div
            key={router.route.concat("layout-fade")}
            className="h-screen w-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {props.children}
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    </>
  );
}

export default HomeLayout;
