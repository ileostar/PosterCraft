"use client";

import { createWorkResponse } from "@/api/types/work";
import { getWorkList } from "@/api/work";
import BaseCard from "@/components/base/BaseCard";
import MoreButton from "@/components/shared/MoreButton";
import BaseList from "@/components/shared/ShowLists";
import { Link } from "@/utils/i18n/routing";
import { useEffect, useState } from "react";

interface WorksListProps {}

const WorksList: React.FC<WorksListProps> = () => {
  const [workList, setWorkList] = useState<createWorkResponse[]>([]);

  const getList = async (pageIndex?: number, pageSize?: number, title?: string) => {
    const res = await getWorkList({ pageIndex, pageSize, title });
    setWorkList(res.data.data.list);
  };

  useEffect(() => {
    getList(1, 8);
  }, []);

  return (
    <div className="w-full mt-10">
      <BaseList title="Works List">
        {workList.map((item) => (
          <BaseCard
            key={item.workId}
            title={item.title}
            description={item.desc}
            imgUrl="https://cimg.co/news/100430/248406/polina-kondrashova-fhrwah2hmnm-unsplash.jpg"
          />
        ))}
      </BaseList>
      <div className="w-full flex items-center justify-center">
        <Link href={"/works"}>
          <MoreButton className="mt-5">Discover More</MoreButton>
        </Link>
      </div>
    </div>
  );
};

export default WorksList;
