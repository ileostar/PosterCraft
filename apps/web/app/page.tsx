import Image from "next/image";

import Banner from "../components/page-components/index/Banner";
import DataBox from "../components/page-components/index/DataBox";
import Footer from "../components/page-components/index/Footer";
import Header from "../components/page-components/index/Header";
import List from "../components/page-components/index/List";

function Main() {
  return (
    <main className="relative">
      <Header mode={"fixed"} />
      <Banner />
      <DataBox />
      <List
        title="热门模板"
        searchText="查找热门模板"
      />
      <List
        title="热门作品"
        searchText="查找热门作品"
      />
      <Footer />
      <Image
        width={1512}
        height={550}
        className="absolute left-1/2 top-0 -z-1 -translate-x-1/2"
        src="/images/gradient-background-top.png"
        alt=""
        role="presentation"
        priority
      />
      <Image
        width={1512}
        height={447}
        className="absolute -bottom-6 left-1/2 -translate-x-1/2"
        src="/images/gradient-background-bottom.png"
        alt=""
        role="presentation"
        priority
      />
    </main>
  );
}

export default Main;
