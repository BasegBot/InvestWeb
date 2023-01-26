// Layout/container used for the main mostly empty landing page, can be used for related pages (credits, about, etc.)

import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  Variants,
} from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import NavBar from "../components/common/NavBar";
import { NavTemplate } from "./NavTemplates";

interface HomeLayoutProps {
  navOptions: NavTemplate[];
  children: React.ReactNode;
  metaTags: {
    title?: string;
    ogTitle?: string;
    description?: string;
    ogDescription?: string;
    content?: string;
    imageUrl?: string;
    themeColor?: string;
    misc?: {
      [key: string]: string;
    };
  };
}

function HomeLayout(props: HomeLayoutProps) {
  // get the nav options
  const navOptions = props.navOptions;
  // get the current route for animation purposes
  const router = useRouter();
  const title = props.metaTags.title ?? "Dashboard - toffee";
  return (
    <m.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={containerVariants}
    >
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={
            props.metaTags.description ?? "Serving anny's community est. 2022"
          }
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="theme-color"
          content={props.metaTags.themeColor ?? "#c084fc"}
        />
        <meta
          property="og:title"
          content={props.metaTags.ogTitle ?? props.metaTags.title ?? "toffee"}
        />
        <meta
          property="og:description"
          content={
            props.metaTags.ogDescription ??
            props.metaTags.description ??
            "Serving anny's community est. 2022"
          }
        />
        <meta
          property="og:image"
          content={props.metaTags.imageUrl ?? "/img/logo.webp"}
        />
        <meta
          property="og:type"
          content={props.metaTags.content ?? "website"}
        />
        <meta property="og:site_name" content="toffee" />
        {props.metaTags.misc &&
          Object.keys(props.metaTags.misc).map((key) => {
            return (
              <meta
                key={key}
                property={key}
                content={props.metaTags.misc ? props.metaTags.misc[key] : ""}
              />
            );
          })}
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
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {props.children}
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    </m.div>
  );
}

const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default HomeLayout;
