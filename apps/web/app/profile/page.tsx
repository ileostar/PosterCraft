import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

import "@/style/index.css";

function Main() {
  return (
    <div className="min-h-svh overflow-hidden p-1.5 btn--animateGlowPink">
      <Header className="max-w-7xl px-4 sm:px-8 md:px-12 xl:px-0 mx-auto" />
      <main className="relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-8 md:px-12 xl:px-0">
        <div className="h-[100vh] text-center">111</div>
      </main>
      <Footer />
    </div>
  );
}

export default Main;
