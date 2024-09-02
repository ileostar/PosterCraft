import BaseButton from "@/components/base/BaseButton";
import BaseCard from "@/components/base/BaseCard";
import BaseGrid from "@/components/base/BaseGrid";
import BaseSearch from "@/components/base/BaseSearch";
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
      <div className="flex justify-between items-center">
        <ul className="flex items-center gap-2">
          <BaseButton isStatic={true}>My Works</BaseButton>
          <BaseButton>My Templates</BaseButton>
        </ul>
        <BaseSearch></BaseSearch>
      </div>
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
