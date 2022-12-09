import Head from "next/head";
import { ReactElement } from "react";
import HomeLayout from "../layouts/HomeLayout";
import { homeMain } from "../layouts/NavTemplates";

function About() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <p>contact</p>
    </div>
  );
}

About.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout navOptions={homeMain}>{page}</HomeLayout>;
};

export default About;
