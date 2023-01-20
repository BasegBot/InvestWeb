import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  Variants,
} from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import NavBar from "../components/dashboard/NavBar";

interface DashLayoutProps {
  children: React.ReactNode;
}

function DashLayout(props: DashLayoutProps) {
  // get the current route for animation purposes
  const router = useRouter();
  return (
    <m.div
      className="bg-gradient-to-t from-zinc-900 to-[#3015457b]"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={containerVariants}
    >
      <Head>
        <title>Dashboard - toffee</title>
        <meta name="description" content="Dashboard statistics for toffee" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#c084fc" />
        <meta property="og:title" content="toffee" />
        <meta
          property="og:description"
          content="Serving anny's community est. 2022"
        />
        <meta property="og:image" content="/img/logo.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="toffee" />
      </Head>

      <div className="flex h-screen w-screen flex-col overflow-hidden lg:flex-row">
        {/* dashboard nav bar */}
        <LazyMotion features={domAnimation}>
          <AnimatePresence mode="wait">
            <NavBar />
          </AnimatePresence>
        </LazyMotion>
        {/* dashboard content */}
        <LazyMotion features={domAnimation}>
          <AnimatePresence mode="wait">
            <m.div
              key={router.route.concat("layout-fade")}
              className="w-screen overflow-y-scroll"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {props.children}
            </m.div>
          </AnimatePresence>
        </LazyMotion>
      </div>
    </m.div>
  );
}

const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default DashLayout;
