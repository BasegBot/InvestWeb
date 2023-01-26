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

function DashLayout(props: DashLayoutProps) {
  // get the current route for animation purposes
  const router = useRouter();
  const title = props.metaTags.title ?? "Dashboard - toffee";
  return (
    <m.div
      className="bg-gradient-to-t from-zinc-900 to-[#3015457b]"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={containerVariants}
    >
      <Head>
        <meta name="viewport" content="initial-scale=0.8" />
        <title>{title}</title>
        <meta
          name="description"
          content={
            props.metaTags.description ?? "Dashboard statistics for toffee"
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
            "Dashboard statistics for toffee"
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
