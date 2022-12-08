import { m } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import HomeLayout from "../layouts/HomeLayout";
import { homeMain } from "../layouts/NavTemplates";
import type { NextPageWithLayout } from "./_app";
import Image from "next/image";

const Home: NextPageWithLayout = () => {
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
        console.log(emoteUrls);
      });
    console.log(currentEmote);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      alt="InvestBot Logo"
      width={128}
      height={128}
      className="ml-4 mr-6"
    />
  );
  if (emotesUrls) {
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
    <div className="flex h-full w-full flex-col items-center justify-center bg-zinc-900">
      <div className="flex text-white">
        <div className="flex flex-col">
          <m.h1 className="font-Manrope m-2 text-7xl">Buy high</m.h1>
          <m.h1 className="font-Manrope m-2 text-7xl">Sell low</m.h1>
          <m.h2 className="pt-2">...or something like that</m.h2>
        </div>
        <div className="flex items-center">{slideShow}</div>
      </div>
    </div>
  );
};

// set the layout for the page, this is used to wrap the page in a layout
Home.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout navOptions={homeMain}>{page}</HomeLayout>;
};

export default Home;
