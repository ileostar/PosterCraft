import Banner from "../components/page-components/index/Banner";
import DataBox from "../components/page-components/index/DataBox";
import Foot from "../components/page-components/index/Foot";
import Head from "../components/page-components/index/Head";
import TemplateList from "../components/page-components/index/TemplateList";

function Main() {
  return (
    <div className="h-screen">
      <Head mode={"fixed"} />
      <Banner />
      <DataBox />
      <TemplateList />
      <Foot />
    </div>
  );
}

export default Main;
