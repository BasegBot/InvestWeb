import { m } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import HomeLayout from "../layouts/HomeLayout";
import { homeMain } from "../layouts/NavTemplates";
import Image from "next/image";
import Head from "next/head";

function Home() {
  let api7tvEmotes = `/api/7tv/emotes?c=61ad997effa9aba101bcfddf`;
  const [emotesUrls, setEmotes] = useState([]);
  const [currentEmote, setCurrentEmote] = useState(0);

  useEffect(() => {
    fetch(api7tvEmotes)
      .then((res) => res.json())
      .then((data) => {
        // get all emote URLs
        let emoteUrls = data.channel.user.emote_sets[0].emotes.map(
          (emote: any) => {
            let base_url = emote.data.host.url;
            // get the largest emote size, append it to the base url
            let largest =
              emote.data.host.files[emote.data.host.files.length - 1];
            // if width != height, skip it
            if (largest.width !== largest.height) {
              return null;
            }
            return `https:${base_url}/${largest.name}`;
          }
        );

        // remove null values

        emoteUrls = emoteUrls.filter((emote: any) => emote !== null);

        setEmotes(emoteUrls);
        setCurrentEmote(Math.floor(Math.random() * emoteUrls.length));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // change emote every 5 seconds, separated from the fetch call so it only initializes once when the emotes are loaded
  useEffect(() => {
    const interval = setInterval(() => {
      // choose a random emote
      let randomEmote = Math.floor(Math.random() * emotesUrls.length);
      setCurrentEmote(randomEmote);
    }, 5000);
    return () => clearInterval(interval);
  }, [emotesUrls]);

  // until the emotes are loaded, show the logo as a placeholder
  let slideShow = (
    <Image
      src="/img/logo.webp"
      alt="toffee Logo"
      width={128}
      height={128}
      className="ml-4 mr-6"
    />
  );
  // if the emotes are loaded, show the slideshow
  if (emotesUrls.length > 0) {
    slideShow = (
      <Image
        src={emotesUrls[currentEmote]}
        alt="7tv emote"
        width={128}
        height={128}
        className="ml-4 mr-6"
      />
    );
  }

  return (
    <>
      <Head>
        <title>Home - toffee</title>
      </Head>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="gap inline-grid grid-cols-1 gap-20 text-white md:grid-cols-3">
          <m.div
            className="flex flex-col from-purple-400 to-pink-600 font-plusJakarta md:col-span-2"
            variants={sloganContainerVariants}
            initial="initial"
            animate="animate"
          >
            <div className="flex flex-row text-8xl font-bold italic">
              <m.h1 variants={sloganHeaderVariants}>t</m.h1>
              <m.h1 className="text-orange-400" variants={sloganHeaderVariants}>
                off
              </m.h1>
              <m.h1 variants={sloganHeaderVariants}>ee</m.h1>
            </div>
            <div className="text-xl italic">
              <m.h2 variants={sloganHeaderVariants}>
                a tax-free offline emote exchange utility
              </m.h2>
            </div>
          </m.div>
          <m.div
            className="flex items-center justify-center"
            variants={slideShowVariants}
            initial="initial"
            animate="animate"
          >
            {slideShow}
            <m.div
              className="fixed"
              variants={sloganSecondaryContainerVariants}
            >
              <m.h2
                className="font-minecraft text-sm font-normal text-yellow-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.99)]"
                variants={sloganSecondaryVariants}
              >
                currently in development!
              </m.h2>
            </m.div>
          </m.div>
        </div>
      </div>
    </>
  );
}

const sloganContainerVariants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 2.5,
      type: "spring",
      bounce: 0.5,
      stiffness: 150,
      delayChildren: 1.0,
      staggerChildren: 0.1,
    },
  },
};

const sloganHeaderVariants = {
  initial: {
    opacity: 0,
    y: -15,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

const sloganSecondaryContainerVariants = {
  initial: {
    opacity: 0,
    rotate: 0,
  },
  animate: {
    opacity: 1,
    rotate: -15,
    transition: {
      delay: 3.5,
      duration: 1.0,
    },
  },
};

const sloganSecondaryVariants = {
  animate: {
    fontSize: ["1.5rem", "1.575rem", "1.5rem"],
    transition: {
      duration: 0.5,
      repeat: Infinity,
    },
  },
};

const slideShowVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 2.0,
      duration: 1.0,
    },
  },
};

// set the layout for the page, this is used to wrap the page in a layout
Home.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout navOptions={homeMain}>{page}</HomeLayout>;
};

export default Home;
