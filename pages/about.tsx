import Head from "next/head";
import { ReactElement } from "react";
import HomeLayout from "../layouts/HomeLayout";
import { homeMain } from "../layouts/NavTemplates";

function About() {
  return (
    <>
      <Head>
        <title>About - InvestBot</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <p>about</p>
      </div>
    </>
  );
}

About.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout navOptions={homeMain}>{page}</HomeLayout>;
};

export default About;
