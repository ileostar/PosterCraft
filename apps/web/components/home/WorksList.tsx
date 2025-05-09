"use client";

import BaseCard from "@/components/base/BaseCard";
import MoreButton from "@/components/MoreButton";
import BaseList from "@/components/ShowLists";
import { useToken } from "@/hooks/useToken";
import { CreateWorkResponse } from "@/http/types/work";
import { getWorkList } from "@/http/work";
import { useWorkStore } from "@/stores/work";
import { Link } from "@/utils/i18n/routing";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface WorksListProps {}

const WorksList: React.FC<WorksListProps> = () => {
  const t = useTranslations();
  const router = useRouter();
  const [token] = useToken();

  const [workList, setWorkList] = useState<CreateWorkResponse[]>([]);
  const { setWork } = useWorkStore();

  const getList = async (pageIndex?: number, pageSize?: number, title?: string) => {
    try {
      const res = await getWorkList({ pageIndex, pageSize, title });
      setWorkList(res.data.data?.list || []);
    } catch (error) {
      console.log("getWorkList Error:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getList(1, 8);
    }
  }, [token]);

  const renderPoster = (item: any) => {
    router.push("/editor");
    setWork(item.workId);
  };

  return token ? (
    <div className="w-full mt-10">
      <BaseList
        hasSearch={false}
        title={t("works-list")}
      >
        {workList.map((item) => (
          <BaseCard
            workId={item.workId}
            key={item.workId}
            title={item.title}
            description={item.desc}
            imgUrl={
              item.coverImg ||
              "https://cimg.co/news/100430/248406/polina-kondrashova-fhrwah2hmnm-unsplash.jpg"
            }
            onClick={() => renderPoster(item)}
          />
        ))}
      </BaseList>
      <div className="w-full flex items-center justify-center">
        <Link href={"/works"}>
          <MoreButton className="mt-5">{t("discover-more")}</MoreButton>
        </Link>
      </div>
    </div>
  ) : null;
};

export default WorksList;
