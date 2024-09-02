import React from "react";

import "@/styles/pages/base.css";

import Footer from "./common/Footer";
import Header from "./common/Header";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-svh overflow-hidden p-1.5 btn--animateGlowPink">
      <Header className="max-w-7xl px-4 sm:px-8 md:px-12 xl:px-0 mx-auto" />
      <main className="relative overflow-hidden mt-6 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 xl:px-0">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
