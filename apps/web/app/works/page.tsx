import BaseCard from "@/components/base/BaseCard";
import Banner from "@/components/shared/Banner";
import BaseList from "@/components/shared/ShowLists";
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

import BaseLayout from "@/components/layouts/BaseLayout";

function Main() {
  return (
    <BaseLayout>
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
    </BaseLayout>
  );
}

export default Main;
