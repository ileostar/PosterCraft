import BaseCard from "@/components/base/BaseCard";
import BaseGrid from "@/components/base/BaseGrid";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface MyWorksProps {}

const MyWorks: React.FC<MyWorksProps> = () => {
  return (
    <div className="w-full mt-8 flex flex-col gap-5">
      <ul className="flex items-center gap-2">
        <li className="inline-block rounded-xl bg-[#E730CA] px-3 py-2 font-semibold text-sm xl:text-base text-white text-center border border-transparent focus-visible:outline-none focus-visible:outline-0 focus-visible:outline-offset-0 focus-visible:outline-transparent transition-colors">
          My Works
        </li>
        <li className="rounded-xl px-3 py-2 font-semibold text-sm xl:text-base text-center hover:text-white border border-[#E730CA] border-solid hover:bg-[#E730CA] focus-visible:outline-none focus-visible:outline-0 focus-visible:outline-offset-0 focus-visible:outline-transparent transition-colors bg-transparent text-[#E730CA]">
          My Templates
        </li>
      </ul>
      <BaseGrid>
        {Array.from({ length: 8 }, (_, i) => i + 1).map((item, index) => (
          <BaseCard
            key={index}
            title="Project Title"
            description="Project Description"
            imgUrl="https://cimg.co/news/100430/248406/polina-kondrashova-fhrwah2hmnm-unsplash.jpg"
          />
        ))}
      </BaseGrid>
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
    </div>
  );
};

export default MyWorks;
