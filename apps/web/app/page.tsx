import Image from "next/image";

import Banner from "../components/page-components/index/Banner";
import DataBox from "../components/page-components/index/DataBox";
import Foot from "../components/page-components/index/Foot";
import Head from "../components/page-components/index/Head";
import TemplateList from "../components/page-components/index/TemplateList";

function Main() {
  return (
    <main className="h-screen">
      <Head mode={"fixed"} />
      <Banner />
      <DataBox />
      <TemplateList />
      <Foot />
      <Image
        width={1512}
        height={550}
        className="absolute left-1/2 top-0 z-10 -translate-x-1/2"
        src="/images/gradient-background-top.png"
        alt=""
        role="presentation"
        priority
      />
      <Image
        width={1512}
        height={447}
        className="absolute -bottom-6 left-1/2 -z-10 -translate-x-1/2"
        src="/images/gradient-background-bottom.png"
        alt=""
        role="presentation"
        priority
      />
    </main>
  );
}

export default Main;
