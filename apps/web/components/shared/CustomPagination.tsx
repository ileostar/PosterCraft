import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const CustomPagination = ({
  pageIndex,
  pageSize,
  totalPage,
  title = "",
  getList,
}: Readonly<{
  pageIndex: number;
  pageSize: number;
  totalPage: number;
  title?: string;
  getList: (pageIndex: number, pageSize: number, title?: string) => void;
}>) => {
  return (
    <Pagination className="mt-3">
      <PaginationContent>
        {pageIndex - 1 === 0 ? null : (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => getList(pageIndex - 1, pageSize, title)}
            />
          </PaginationItem>
        )}
        {pageIndex - 1 === 0 ? null : (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => getList(pageIndex - 1, pageSize, title)}
            >
              {pageIndex - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem className="bg-[#c8e0ef]">
          <PaginationLink href="#">{pageIndex}</PaginationLink>
        </PaginationItem>
        {totalPage < pageIndex + 1 ? null : (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => getList(pageIndex + 1, pageSize, title)}
            >
              {pageIndex + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {totalPage <= pageIndex + 1 ? null : (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {totalPage < pageIndex + 1 ? null : (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => getList(pageIndex + 1, pageSize, title)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
