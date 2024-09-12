"use client";

import { getTemplateList } from "@/api/template";
import { createWorkResponse } from "@/api/types/work";
import { getWorkList } from "@/api/work";
import BaseButton from "@/components/base/BaseButton";
import BaseCard from "@/components/base/BaseCard";
import BaseGrid from "@/components/base/BaseGrid";
import BaseSearch from "@/components/base/BaseSearch";
import CustomPagination from "@/components/shared/CustomPagination";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MyWorksProps {
  isMyself: boolean;
}

const MyWorks: React.FC<MyWorksProps> = (params) => {
  const router = useRouter();

  const [mode, setMode] = useState<"work" | "template">("template");
  const [renderList, setRenderList] = useState<createWorkResponse[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [totalPage, setTotalPage] = useState(0);
  const [title, setTitle] = useState("");

  const getList = async (pageIndex: number, pageSize: number, title?: string) => {
    const res =
      mode == "work"
        ? await getWorkList({ pageIndex, pageSize, title })
        : await getTemplateList({ pageIndex, pageSize, title });
    setRenderList(res.data.data.list);
    setPageIndex(pageIndex);
    setPageSize(pageSize);
    setTotalPage(Math.ceil(res.data.data.count / pageSize));
  };

  useEffect(() => {
    getList(1, pageSize, title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, mode]);

  const renderPoster = (item: any) => {
    router.push("/editor");
    localStorage.setItem("currentWorkId", item.workId);
  };

  return (
    <div className="w-full mt-8 flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <ul className="flex items-center gap-2">
          <BaseButton
            isStatic={mode == "template" ? true : false}
            onClick={() => {
              setMode("template");
            }}
          >
            My Templates
          </BaseButton>
          {params.isMyself ? (
            <BaseButton
              isStatic={mode == "work" ? true : false}
              onClick={() => {
                setMode("work");
              }}
            >
              My Works
            </BaseButton>
          ) : null}
        </ul>
        <BaseSearch onSearch={(e: any) => setTitle(e)}></BaseSearch>
      </div>
      <BaseGrid>
        {renderList.map((item) => (
          <BaseCard
            key={item.workId}
            title={item.title}
            description={item.desc}
            imgUrl="https://cimg.co/news/100430/248406/polina-kondrashova-fhrwah2hmnm-unsplash.jpg"
            onClick={() => renderPoster(item)}
          />
        ))}
      </BaseGrid>
      <CustomPagination
        pageIndex={pageIndex}
        pageSize={pageSize}
        title={title}
        totalPage={totalPage}
        getList={getList}
      />
    </div>
  );
};

export default MyWorks;
