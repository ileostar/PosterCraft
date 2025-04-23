"use client";

import BaseButton from "@/components/base/BaseButton";
import BaseCard from "@/components/base/BaseCard";
import BaseGrid from "@/components/base/BaseGrid";
import BaseSearch from "@/components/base/BaseSearch";
import CustomPagination from "@/components/CustomPagination";
import { getUserTemplateList } from "@/http/template";
import { CreateWorkResponse } from "@/http/types/work";
import { getUserWorksList } from "@/http/work";
import { useWorkStore } from "@/stores/work";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MyWorksProps {
  isMyself: boolean;
}

const MyWorks: React.FC<MyWorksProps> = (params) => {
  const router = useRouter();
  const { setWork } = useWorkStore();

  const [mode, setMode] = useState<"work" | "template">("template");
  const [renderList, setRenderList] = useState<CreateWorkResponse[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [totalPage, setTotalPage] = useState(0);
  const [title, setTitle] = useState("");

  const getList = async (pageIndex: number, pageSize: number, title?: string) => {
    try {
      const res =
        mode == "work"
          ? await getUserWorksList({ pageIndex, pageSize, title })
          : await getUserTemplateList({ pageIndex, pageSize, title });
      console.log("res.data", res.data);
      setRenderList(res.data.data.list || []);
      setPageIndex(pageIndex);
      setPageSize(pageSize);
      setTotalPage(Math.ceil(res.data.data?.count / pageSize));
    } catch (error) {
      console.log("getList Error:", error);
    }
  };

  useEffect(() => {
    getList(pageIndex, pageSize, title);
  }, [title, mode]);

  const renderPoster = (item: any) => {
    router.push("/editor");
    setWork(item.workId);
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
