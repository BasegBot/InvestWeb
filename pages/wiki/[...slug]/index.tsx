import { getAllWikiPaths, getWikiContent } from "../../../lib/wiki/api";
import WikiPage from "../../../interfaces/WikiPage";
import DashLayout from "../../../layouts/DashLayout";
import Link from "next/link";
import { m } from "framer-motion";
import PageBody from "../../../components/wiki/PageBody";
import { ReactElement, useEffect, useState } from "react";

interface WikiLandingPageProps {
  children: React.ReactNode;
  page: WikiPage;
}

interface TableOfContentsItem {
  id: string;
  type: string;
  text: string;
}

function WikiLandingPage(props: WikiLandingPageProps) {
  const [wikiContent, setWikiContent] = useState<ReactElement>(<></>);
  const [indexContent, setIndexContent] = useState<TableOfContentsItem[]>([]);
  const [showMobileIndex, setShowMobileIndex] = useState<boolean>(false);

  // needed for proper hydration due to replacing some elements
  useEffect(() => {
    setWikiContent(
      <PageBody currentLanguage={props.page.language} path={props.page.path}>
        {props.page.content}
      </PageBody>
    );
  }, [props.page.content, props.page.language, props.page.path]);

  useEffect(() => {
    const toc: TableOfContentsItem[] = [];
    const headings = document.querySelectorAll("h2, h3");
    // store the heading text, id, and type, keep order
    headings.forEach((heading) => {
      const id = heading.getAttribute("id");
      const type = heading.tagName.toLowerCase();
      const text = heading.textContent;
      if (id && type && text) {
        toc.push({ id, type, text });
      }
    });
    setIndexContent(toc);
  }, [wikiContent]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-3 font-plusJakarta ">
      <div className="inline-grid h-full w-full max-w-screen-2xl grid-cols-10">
        {/* Sidebar */}
        <div className="col-span-2 hidden w-full flex-col items-center justify-center lg:block">
          <div className="w-full rounded-tl-2xl rounded-bl-2xl border-r-2 border-orange-400 border-opacity-60 bg-zinc-800 bg-opacity-70 p-6 text-left text-6xl text-white">
            <div className="text-2xl">Contents</div>
            <div className="mt-4 text-left text-orange-400">
              {indexContent.map((item) => {
                return (
                  // increase indent based on heading level
                  <div
                    style={{
                      paddingLeft: `${(parseInt(item.type[1]) - 2) * 1.25}rem`,
                    }}
                    className="text-xl"
                    key={item.id}
                  >
                    <Link href={`#${item.id}`}>
                      <p className="mt-2 overflow-hidden overflow-ellipsis whitespace-nowrap hover:text-white">
                        {item.text}
                      </p>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Mobile "Side"-bar */}
        <div className="col-span-10 mb-6 lg:hidden">
          <div className="w-full rounded-2xl rounded-tl-2xl bg-zinc-800 bg-opacity-70 p-6 text-left text-6xl text-white">
            <div
              className="flex cursor-pointer flex-row text-2xl"
              onClick={() => setShowMobileIndex(!showMobileIndex)}
            >
              <div>Contents</div>
              <m.svg
                className="pointer-events-auto mt-2 ml-3 cursor-pointer lg:hidden"
                origin="center"
                width="20"
                height="21"
                viewBox="0 0 330 330"
                x={0}
                y={0}
                animate={{ rotate: showMobileIndex ? 180 : 0 }}
              >
                <m.path
                  d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                  fill="white"
                  stroke="white"
                  strokeWidth="15"
                  strokeLinecap="round"
                />
              </m.svg>
            </div>
            <m.div
              className="overflow-hidden text-left text-orange-400"
              animate={{
                height: showMobileIndex ? "auto" : 0,
                marginTop: showMobileIndex ? "0.5rem" : 0,
              }}
            >
              {indexContent.map((item) => {
                return (
                  // increase indent based on heading level
                  <div
                    style={{
                      paddingLeft: `${(parseInt(item.type[1]) - 2) * 2}rem`,
                    }}
                    className="text-xl"
                    key={item.id}
                  >
                    <Link href={`#${item.id}`}>
                      <p className="mt-2 overflow-hidden overflow-ellipsis whitespace-nowrap hover:text-white">
                        {item.text}
                      </p>
                    </Link>
                  </div>
                );
              })}
            </m.div>
          </div>
        </div>
        {/* Main content */}
        <div className="col-span-10 rounded-2xl bg-zinc-800 bg-opacity-70 p-6 text-center text-6xl text-white lg:col-span-8 lg:rounded-tl-none">
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            key={props.page.slug}
          >
            <div className="w-full px-3">{wikiContent}</div>
          </m.div>
        </div>
      </div>
    </div>
  );
}

type Params = {
  params: {
    slug: string[];
  };
};

export async function getStaticProps({ params }: Params) {
  // only language
  if (params.slug.length < 2) {
    // if langauge is two letters, redirect to its home
    if (params.slug[0].length === 2 && params.slug[0].match(/^[a-z]+$/i)) {
      return {
        redirect: {
          destination: `/wiki/${params.slug[0]}/home`,
        },
      };
    }
    // else, 404 to prevemt building pointless pages (e.g. /wiki/this-is-not-a-language x 580258538 times)
    return {
      notFound: true,
    };
  }
  // slug[0] = language
  // slug[1...n] = page path
  const lang = params.slug[0];
  const path = params.slug.slice(1).join("/");
  const pageData = getWikiContent(lang, path);

  // if no content, 404
  if (!pageData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      page: {
        slug: params.slug,
        content: pageData.content,
        language: lang,
        path: path,
        data: pageData.data,
      },
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllWikiPaths();

  return {
    paths: paths.map((path) => {
      return {
        params: {
          slug: path.split("/"),
        },
      };
    }),
    fallback: "blocking",
  };
}

WikiLandingPage.getLayout = function getLayout(page: React.ReactNode) {
  const metaTags = {
    title: "Wiki - toffee",
    description: "Wiki for toffee",
  };
  return <DashLayout metaTags={metaTags}>{page}</DashLayout>;
};

export default WikiLandingPage;
