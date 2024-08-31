import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Hero from "@/components/page/index/Hero";
import Introduce from "@/components/page/index/Introduce";
import TemplateList from "@/components/page/index/TemplateList";
import WorksList from "@/components/page/index/WorksList";

import "@/style/index.css";

function Main() {
  return (
    <div className="min-h-svh overflow-hidden p-1.5 btn--animateGlowPink">
      <Header className="max-w-7xl px-4 sm:px-8 md:px-12 xl:px-0 mx-auto" />
      <main className="relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-8 md:px-12 xl:px-0">
        <Hero />
        <Introduce />
        <WorksList />
        <TemplateList />
      </main>
      <Footer />
    </div>
  );
}

export default Main;
