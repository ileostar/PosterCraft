import BaseCard from "@/components/base/BaseCard";
import BaseList from "@/components/base/BaseList";
import Banner from "@/components/layout/Banner";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import "@/style/index.css";

function Main() {
  return (
    <div className="min-h-svh overflow-hidden p-1.5 btn--animateGlowPink">
      <Header className="max-w-7xl px-4 sm:px-8 md:px-12 xl:px-0 mx-auto" />
      <main className="relative overflow-hidden mt-8 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 xl:px-0">
        <Banner className="h-[30vh] bg-sky-500/20 rounded-lg text-center text-white font-bold text-4xl py-10" />
        <BaseList title="All Works List ✨">
          {Array.from({ length: 16 }, (_, i) => i + 1).map((item, index) => (
            <BaseCard
              key={index}
              title="Project Title"
              description="Project Description"
              imgUrl="https://cimg.co/news/100430/248406/polina-kondrashova-fhrwah2hmnm-unsplash.jpg"
            />
          ))}
        </BaseList>
        <Pagination className="mt-3">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
      <Footer />
    </div>
  );
}

export default Main;
