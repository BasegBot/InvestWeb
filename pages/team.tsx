import Head from "next/head";
import { ReactElement } from "react";
import HomeLayout from "../layouts/HomeLayout";
import { homeMain } from "../layouts/NavTemplates";

function Team() {
  return (
    <>
      <Head>
        <title>Team - InvestBot</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <p>Team</p>
      </div>
    </>
  );
}

Team.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout navOptions={homeMain}>{page}</HomeLayout>;
};

export default Team;
