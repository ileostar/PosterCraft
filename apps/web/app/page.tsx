"use client";

import Banner from "../components/page-components/index/Banner";
import DataBox from "../components/page-components/index/DataBox";
import TemplateList from "../components/page-components/index/TemplateList";
import Foot from "../components/page-components/index/Foot";
import Head from "../components/page-components/index/Head";

function Main() {
   
  return (
    <div className="h-screen">
      <Head />
      <Banner />
      <DataBox />
      <div className="divider w-4/5 mx-auto"></div>
      <TemplateList />
      <Foot />
    </div>
  );
}

export default Main;
