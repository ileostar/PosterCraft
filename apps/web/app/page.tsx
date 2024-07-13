"use client";

import Body_1 from "../components/main/body_1";
import Body_2 from "../components/main/body_2";
import Body_3 from "../components/main/body_3";
import Footer from "../components/main/footer";
import Head from "../components/main/head";

function Main() {
   
  return (
    <div className="h-screen">
      <Head />
      <Body_1 />
      <Body_2 />
      <div className="divider w-4/5 mx-auto"></div>
      <Body_3 />
      <Footer />
    </div>
  );
}

export default Main;
