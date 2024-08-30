import Banner from "@/components/page-components/index/Banner";
import Footer from "@/components/page-components/index/Footer";
import Header from "@/components/page-components/index/Header";
import Introduce from "@/components/page-components/index/Introduce";
import TemplateList from "@/components/page-components/index/TemplateList";
import WorksList from "@/components/page-components/index/WorksList";

import "../style/index.css";

function Main() {
  return (
    <div className="min-h-svh overflow-hidden p-1.5 btn--animateglowPink">
      <Header className="max-w-7xl px-4 sm:px-8 md:px-12 xl:px-0 mx-auto" />
      <main className="relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-8 md:px-12 xl:px-0">
        <Banner />
        <Introduce />
        <WorksList />
        <TemplateList />
      </main>
      <Footer />
    </div>
  );
}

export default Main;
