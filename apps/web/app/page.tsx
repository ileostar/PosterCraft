import Banner from "../components/page-components/index/Banner";
import DataBox from "../components/page-components/index/DataBox";
import Foot from "../components/page-components/index/Foot";
import Head from "../components/page-components/index/Head";
import List from "../components/page-components/index/List";

function Main() {
  return (
    <main className="h-screen">
      <Head mode={"fixed"} />
      <Banner />
      <DataBox />
      <List mode="模板"/>
      <List mode="作品"/>
      <Foot />
    </main>
  );
}

export default Main;
