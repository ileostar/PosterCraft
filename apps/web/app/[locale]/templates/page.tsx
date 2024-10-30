"use client";

import { getTemplateList } from "@/api/template";
import { createWorkResponse } from "@/api/types/work";
import BaseCard from "@/components/base/BaseCard";
import BaseLayout from "@/components/layouts/BaseLayout";
import Banner from "@/components/shared/Banner";
import CustomPagination from "@/components/shared/CustomPagination";
import BaseList from "@/components/shared/ShowLists";
import { useWorkStore } from "@/stores/work";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Main() {
  const { setWork } = useWorkStore();
  const [workList, setWorkList] = useState<createWorkResponse[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [totalPage, setTotalPage] = useState(0);
  const [title, setTitle] = useState("");

  const router = useRouter();

  const getList = async (pageIndex: number, pageSize: number, title?: string) => {
    const res = await getTemplateList({ pageIndex, pageSize, title });
    setWorkList(res.data.data.list);
    setPageIndex(pageIndex);
    setPageSize(pageSize);
    setTotalPage(Math.ceil(res.data.data.count / pageSize));
  };

  useEffect(() => {
    getList(1, pageSize, title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  const renderPoster = (item: any) => {
    router.push("/editor");
    setWork(item.workId);
  };

  return (
    <BaseLayout>
      <Banner className="h-[30vh] bg-sky-500/20 rounded-lg text-center text-white font-bold text-4xl py-10" />
      <BaseList
        title="Template Market 🛒"
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
      <CustomPagination
        pageIndex={pageIndex}
        pageSize={pageSize}
        title={title}
        totalPage={totalPage}
        getList={getList}
      />
    </BaseLayout>
  );
}

export default Main;
