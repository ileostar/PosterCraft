import Banner from "../components/page-components/index/Banner";
import DataBox from "../components/page-components/index/DataBox";
import Foot from "../components/page-components/index/Foot";
import Head from "../components/page-components/index/Head";
import TemplateList from "../components/page-components/index/TemplateList";

function Main() {
  return (
    <main className="h-screen">
      <Head />
      <Banner />
      <DataBox />
      <TemplateList />
      <Foot />
    </main>
  );
}

export default Main;
