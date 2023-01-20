import { m } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import DashLayout from "../../../layouts/DashLayout";
import Image from "next/image";
import Loading from "../../../components/common/Loading";

// TODO: Animations

function UserPage() {
  const [channelEmotes, setChannelEmotes] = useState<{ [key: string]: string }>(
    {}
  );
  const [userData, setUserData] = useState<{ [key: string]: any }>({});
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const router = useRouter();
  const { username } = router.query;
  const title = username ? `${username} - toffee` : "toffee";

  useEffect(() => {
    if (!router.isReady) return;
    fetch("/api/7tv/emotes?c=61ad997effa9aba101bcfddf")
      .then((res) => res.json())
      .then((data) => {
        // if error, return
        if (data.error) {
          setErrorCode(data.error.code);
          return;
        }
        // construct js object with emote names as keys and emote urls as values
        let emotes: { [key: string]: string } = {};
        data.channel.user.emote_sets[0].emotes.forEach((emote: any) => {
          let base_url = emote.data.host.url;
          // get the largest emote size, append it to the base url
          let largest = emote.data.host.files[emote.data.host.files.length - 1];
          emotes[emote.data.name] = `https:${base_url}/${largest.name}`;
        });
        setChannelEmotes(emotes);
      });
    fetch(`/api/fakeUsers?u=${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setErrorCode(data.error.code);
        }
        setUserData(data.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);
  // if json is empty
  if (Object.keys(channelEmotes).length === 0 && errorCode !== 10000) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-3xl">
        <Loading />
      </div>
    );
  }
  if (errorCode === 20000) {
    return (
      <m.div
        className="flex h-screen w-full items-center justify-center text-3xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1.0 } }}
        exit={{ opacity: 0, y: -25 }}
      >
        <p>User not found :c</p>
      </m.div>
    );
  }
  if (!userData || Object.keys(userData).length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-3xl">
        <Loading />
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={`${username}'s portfolio on toffee`}
        />
      </Head>
      <div className="flex justify-center">
        <div className="mt-2 inline-grid w-[calc(100%-40px)] max-w-5xl grid-cols-10 gap-3 pt-12 pl-2 font-plusJakarta lg:pl-0 lg:pr-2">
          {/*  User "banner"  */}
          <div className="col-span-10 mb-2 rounded-2xl bg-zinc-800 bg-opacity-70 p-3">
            <div className="flex items-center justify-between p-4">
              <div className="flex flex-row items-center">
                <Image
                  src={userData.avatar_url}
                  alt="User avatar"
                  width={140}
                  height={140}
                  className="fixed rounded-lg border-4"
                  style={{
                    borderColor: userData.badges[0]
                      ? userData.badges[0].color
                      : "grey",
                    // "glow" effect
                    boxShadow: `0px 0px 20px 1px ${
                      userData.badges[0]
                        ? userData.badges[0].color
                        : "transparent"
                    }`,
                  }}
                />
                <div className="ml-[154px] flex-col">
                  <h1 className="text-4xl font-semibold text-white">
                    {userData.name}
                  </h1>
                  {/*  User's badges  */}
                  <div className="mt-1 flex flex-row text-sm">
                    {userData.badges ? (
                      userData.badges.map(
                        (badge: {
                          name: string;
                          color: string;
                          priority: number;
                        }) => {
                          return (
                            <div
                              style={{ backgroundColor: badge.color }}
                              className="mr-1 rounded-md bg-purple-500 px-2"
                              key={badge.name}
                            >
                              <span className="text-white">{badge.name}</span>
                            </div>
                          );
                        }
                      )
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <h1>
                  <span className="text-4xl font-semibold text-zinc-400">
                    $
                  </span>
                  <span className="text-4xl text-white">
                    {userData.net_worth.toLocaleString("en-US")}
                  </span>
                </h1>
              </div>
            </div>
          </div>
          {/*  Main Container  */}
          <div className="col-span-7 inline-grid grid-cols-7 gap-3 rounded-2xl">
            {/*  User's Rank/Graph  */}
            <div className="col-span-7 rounded-2xl bg-zinc-800 bg-opacity-70">
              <div className="flex flex-row items-center justify-between p-5">
                <div className="flex-col">
                  <h1 className="mb-1 text-center text-2xl font-medium text-white underline">
                    Global Rank
                  </h1>
                  <div className="flex items-center text-3xl font-bold">
                    <span className="text-zinc-400">#</span>
                    <span className="text-white">
                      {userData.rank.toLocaleString("en-US")}
                    </span>
                  </div>
                </div>
                <div>
                  <Image
                    src="/img/well_drawn_rank_chart.webp"
                    alt="Rank chart"
                    width={497}
                    height={100}
                  />
                </div>
              </div>
            </div>
            {/*  User's Assets  */}
            <div className="col-span-7 flex flex-col rounded-2xl bg-zinc-800 bg-opacity-70">
              {/*  User's Assets Header  */}
              <div className="h-11 w-full rounded-t-2xl bg-pink-400">
                <h1 className="m-1 text-center text-2xl font-bold">
                  Top Assets
                </h1>
              </div>
              {/*  User's Assets Body  */}
              <div className="inline-grid grid-cols-4 items-center justify-start p-5">
                {errorCode === 20000 ? (
                  <h1 className=" text-zinc-400">{`Could not load assets`}</h1>
                ) : (
                  userData.assets.map(
                    (asset: {
                      name: string;
                      count: number;
                      provider: string;
                    }) => (
                      <div
                        className="m-2 mb-0 flex h-44 w-40 flex-col items-center rounded-xl bg-zinc-900 bg-opacity-80 p-2"
                        key={asset.name}
                      >
                        <div className="mt-2 mb-2 h-24 w-24">
                          <div className="flex h-full w-full items-center justify-center p-2">
                            {
                              // if error code is 10000, show placeholder image
                              errorCode === 10000 ? (
                                <h1 className="text-center text-zinc-400">{`404 :(`}</h1>
                              ) : (
                                <Image
                                  src={channelEmotes[asset.name]}
                                  alt={asset.name}
                                  width={100}
                                  height={100}
                                  className="max-h-[100px]"
                                />
                              )
                            }
                            {/*  Fix asset count to bottom right of image  */}
                            <div className="relative rounded-full bg-zinc-900 bg-opacity-80 p-1">
                              <p
                                className="absolute -bottom-10 -right-2 -rotate-12 text-lg font-bold text-white"
                                style={{ textShadow: "0px 0px 4px black" }}
                              >
                                x{asset.count}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex w-full flex-row items-center justify-center">
                          {
                            // show provider logo (7tv, bttv, ffz, twitch)
                            asset.provider === "7tv" ? (
                              <div className="mr-1 pt-[1px] text-7tv ">
                                <SevenTVLogo />
                              </div>
                            ) : asset.provider === "bttv" ? (
                              <div className="mr-1 pt-[1px] text-bttv">
                                <BTTVLogo />
                              </div>
                            ) : asset.provider === "ffz" ? (
                              <div className="h-5 w-6 text-white">
                                <FFZLogo />
                              </div>
                            ) : (
                              <div className="mr-1 w-4 pt-[1px] text-ttv">
                                <TwitchLogo />
                              </div>
                            )
                          }
                          <p className="text-md max-w-[80%] overflow-hidden overflow-ellipsis whitespace-nowrap font-bold text-white">
                            {asset.name}
                          </p>
                        </div>
                      </div>
                    )
                  )
                )}
              </div>
            </div>
          </div>
          {/*  Sidebar  */}
          <div className="col-span-3 flex flex-col">
            <div className="center mb-3 inline-grid grid-cols-2 gap-3 rounded-2xl bg-zinc-800 bg-opacity-70 p-5 text-xl font-medium">
              {/*  User's Stats, left side is label, right side is value  */}
              <h1>Points</h1>
              <h1>{userData.points.toLocaleString("en-US")}</h1>
              <h1>Shares</h1>
              <h1>{userData.shares.toLocaleString("en-US")}</h1>
              <h1>Trades</h1>
              <h1>{(userData.trades ?? 0).toLocaleString("en-US")}</h1>
              <h1>Peak rank</h1>
              <h1>{(userData.peak_rank ?? 0).toLocaleString("en-US")}</h1>
              <h1>Joined</h1>
              <h1>
                {new Date(userData.joined ?? 0).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })}
              </h1>
            </div>
            {/*  User's Favorite Emote  */}
            <div className="flex flex-col rounded-2xl bg-zinc-800 bg-opacity-70">
              <div className="h-11 w-full rounded-t-2xl bg-pink-400">
                <h1 className="m-1 text-center text-2xl font-bold">
                  Favorite Emote
                </h1>
              </div>
              <div>
                <p className="m-5 text-lg text-zinc-400">
                  This user has not yet set a favorite emote.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const SevenTVLogo = () => {
  return (
    <svg viewBox="0 0 109.6 80.9" width="1em">
      <g>
        <path
          d="M84.1,22.2l5-8.7,2.7-4.6L86.8.2V0H60.1l5,8.7,5,8.7,2.8,4.8H84.1"
          fill="currentColor"
        ></path>
        <path
          d="M29,80.6l5-8.7,5-8.7,5-8.7,5-8.7,5-8.7,5-8.7L62.7,22l-5-8.7-5-8.7L49.9.1H7.7l-5,8.7L0,13.4l5,8.7v.2h32l-5,8.7-5,8.7-5,8.7-5,8.7-5,8.7L8.5,72l5,8.7v.2H29"
          fill="currentColor"
        ></path>
        <path
          d="M70.8,80.6H86.1l5-8.7,5-8.7,5-8.7,5-8.7,3.5-6-5-8.7v-.2H89.2l-5,8.7-5,8.7-.7,1.3-5-8.7-5-8.7-.7-1.3-5,8.7-5,8.7L55,53.1l5,8.7,5,8.7,5,8.7.8,1.4"
          fill="currentColor"
        ></path>
      </g>
    </svg>
  );
};

const FFZLogo = () => {
  return (
    <svg viewBox="0 0 396 396">
      <path
        d="m150.06,151.58c-.77-6.33.31-12.45,1.99-18.5,2.37-8.51,9.11-14.22,15.62-18.44,8.71-5.65,18.98-8.6,30.02-8.89,7.26-.19,12.89,3.13,18.17,6.2,3.98,2.32,7.8,6.66,10.25,11.43,2.99,5.83,5.92,11.51,7.05,18.18,1.17,6.9,4.69,13.3,9.05,18.55,4.61,5.55,5.63,11.86,5.53,18.1-.15,8.77,3.32,16.07,6.61,23.64.93,2.14,2.15,3.87,4.76,3.08,2.58-.77,4.04-2.69,3.78-5.44-.32-3.41-.64-6.86-1.43-10.18-1.01-4.18-1.54-8.31-1.45-12.65.19-9.37,6.06-15.83,12.06-21.43,5.81-5.44,9.29-4.23,15.15,1.48,7.52,7.32,14.31,15.22,18.49,24.91,3.86,8.94,7.62,17.97,10.54,27.24,1.79,5.7,2.26,11.9,2.71,17.92.35,4.7-2.69,8.43-6.01,11.17-12.05,9.97-24.04,20.06-38.64,26.39-3.06,1.32-5.93,3.65-8.27,5.9-4.3,4.13-8.7,4.8-14.22,3.81-6.67-1.2-12.21,2.2-17.76,5.37-10.83,6.19-21.98,11.44-34.99,10.56-2.65-.18-5.35-.19-7.99.05-9.67.89-18.35-1.86-26.44-6.91-5.06-3.16-10.74-5.27-15.39-9.12-.62-.51-1.58-.75-1.96-1.37-3.61-5.84-8.03-5.41-13.72-2.82-7.66,3.48-8.07,3.02-13.2-3.77-3.48-4.6-8.91-6.59-13.27-10.01-11.43-8.97-22.52-18.11-29.39-31.42-2.17-4.21-2.9-8.38-2.59-12.82.76-10.87,1-21.85,7.82-31.3,6.01-8.32,10.79-17.68,19.29-23.9,5.9-4.32,10.15-2.9,14.27,3.26,6.93,10.36,7.99,21.4,4.42,33.03-1.46,4.76-.62,9.52-.8,14.28-.09,2.23,2.26,4.61,3.36,4.24,2.47-.83,5.83.99,7.52-2.37,5.96-11.87,14.26-22.67,17.36-35.82,1.65-7.02,2.21-14.34,1.72-21.63Z"
        fill="currentColor"
      />
    </svg>
  );
};

const BTTVLogo = () => {
  return (
    <svg viewBox="0 0 300 300" height="1em">
      <path
        fill="transparent"
        d="M249.771 150A99.771 99.922 0 0 1 150 249.922 99.771 99.922 0 0 1 50.229 150 99.771 99.922 0 0 1 150 50.078 99.771 99.922 0 0 1 249.771 150Z"
      ></path>
      <path
        fill="currentColor"
        d="M150 1.74C68.409 1.74 1.74 68.41 1.74 150S68.41 298.26 150 298.26h148.26V150.17h-.004c0-.057.004-.113.004-.17C298.26 68.409 231.59 1.74 150 1.74zm0 49c55.11 0 99.26 44.15 99.26 99.26 0 55.11-44.15 99.26-99.26 99.26-55.11 0-99.26-44.15-99.26-99.26 0-55.11 44.15-99.26 99.26-99.26z"
      ></path>
      <path
        fill="currentColor"
        d="M161.388 70.076c-10.662 0-19.42 7.866-19.42 17.67 0 9.803 8.758 17.67 19.42 17.67 10.662 0 19.42-7.867 19.42-17.67 0-9.804-8.758-17.67-19.42-17.67zm45.346 24.554-.02.022-.004.002c-5.402 2.771-11.53 6.895-18.224 11.978l-.002.002-.004.002c-25.943 19.766-60.027 54.218-80.344 80.33h-.072l-1.352 1.768c-5.114 6.69-9.267 12.762-12.098 18.006l-.082.082.022.021v.002l.004.002.174.176.052-.053.102.053-.07.072c30.826 30.537 81.213 30.431 111.918-.273 30.783-30.784 30.8-81.352.04-112.152l-.005-.004zM87.837 142.216c-9.803 0-17.67 8.758-17.67 19.42 0 10.662 7.867 19.42 17.67 19.42 9.804 0 17.67-8.758 17.67-19.42 0-10.662-7.866-19.42-17.67-19.42z"
      ></path>
    </svg>
  );
};

const TwitchLogo = () => {
  return (
    <svg x="0px" y="0px" viewBox="0 0 2400 2800">
      <g>
        <polygon
          className="fill-white"
          points="2200,1300 1800,1700 1400,1700 1050,2050 1050,1700 600,1700 600,200 2200,200"
        />
        <g>
          <g id="Layer_1-2">
            <path
              fill="currentColor"
              d="M500,0L0,500v1800h600v500l500-500h400l900-900V0H500z M2200,1300l-400,400h-400l-350,350v-350H600V200h1600     V1300z"
            />
            <rect
              x="1700"
              y="550"
              fill="currentColor"
              width="200"
              height="600"
            />
            <rect
              x="1150"
              y="550"
              fill="currentColor"
              width="200"
              height="600"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

UserPage.getLayout = function getLayout(page: ReactElement) {
  return <DashLayout>{page}</DashLayout>;
};

export default UserPage;