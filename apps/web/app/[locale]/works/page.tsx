"use client";

import { createWorkResponse } from "@/api/types/work";
import { getWorkList } from "@/api/work";
import BaseCard from "@/components/base/BaseCard";
import BaseLayout from "@/components/layouts/BaseLayout";
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
import { UseElementStore } from "@/stores/element";
// import { useRouter } from "@/utils/i18n/routing"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Main() {
  const [workList, setWorkList] = useState<createWorkResponse[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [totalPage, setTotalPage] = useState(0);
  const [title, setTitle] = useState("");

  const router = useRouter();

  const getList = async (pageIndex: number, pageSize: number, title?: string) => {
    const res = await getWorkList({ pageIndex, pageSize, title });
    setWorkList(res.data.data.list);
    setPageIndex(pageIndex);
    setTotalPage(Math.ceil(res.data.data.count / pageSize));
  };

  useEffect(() => {
    getList(1, pageSize, title);
  }, [title]);

  const renderPoster = (item: any) => {
    router.push("/editor");
    localStorage.setItem("currentWorkId", item.workId);
  };

  return (
    <BaseLayout>
      <Banner className="h-[30vh] bg-sky-500/20 rounded-lg text-center text-white font-bold text-4xl py-10" />
      <BaseList
        title="All Works List ✨"
        onSearch={(e: any) => setTitle(e)}
      >
        {workList.map((item) => (
          <BaseCard
            key={item.workId}
            title={item.title}
            description={item.desc}
            imgUrl="https://cimg.co/news/100430/248406/polina-kondrashova-fhrwah2hmnm-unsplash.jpg"
            onClick={() => renderPoster(item)}
          />
        ))}
      </BaseList>
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
    </BaseLayout>
  );
}

export default Main;
