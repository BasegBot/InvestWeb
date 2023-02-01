import DashLayout from "../../../layouts/DashLayout";
import Image from "next/image";
// markdown styles
import styles from "../../../styles/markdown.module.css";

interface WikiLandingPageProps {
  children: React.ReactNode;
}

function WikiLandingPage(props: WikiLandingPageProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-3 font-plusJakarta">
      <div className="inline-grid h-full w-full max-w-7xl grid-cols-10 rounded-2xl bg-zinc-800 bg-opacity-70 p-6">
        <div className="col-span-10 text-center text-6xl font-semibold text-white">
          <div className="flex flex-row items-center justify-center">
            <Image
              src="/img/emotes/peepoTalk.webp"
              alt={"PeepoTalk"}
              width={64}
              height={64}
              className="mr-3 mb-4"
            />
            <div>
              <span>the t</span>
              <span className="text-orange-400">off</span>
              <span>ee wiki</span>
            </div>
          </div>
          <div className={styles.markdown}>
            <div className="text-left"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

WikiLandingPage.getLayout = function getLayout(page: React.ReactNode) {
  const metaTags = {
    title: "Wiki",
    description: "Wiki for toffee",
  };
  return (
    <DashLayout metaTags={metaTags} navIcon="wiki">
      {page}
    </DashLayout>
  );
};

export default WikiLandingPage;
