"use client";

import BaseCard from "@/components/base/BaseCard";
import MoreButton from "@/components/MoreButton";
import BaseList from "@/components/ShowLists";
import { getTemplateList } from "@/http/template";
import { CreateWorkResponse } from "@/http/types/work";
import { useWorkStore } from "@/stores/work";
import { Link } from "@/utils/i18n/routing";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface TemplateListProps {}

const TemplateList: React.FC<TemplateListProps> = () => {
  const t = useTranslations();
  const router = useRouter();
  const { setWork } = useWorkStore();

  const [templateList, setTemplateList] = useState<CreateWorkResponse[]>([]);

  const getList = async (pageIndex?: number, pageSize?: number, title?: string) => {
    try {
      const res = await getTemplateList({ pageIndex, pageSize, title });
      setTemplateList(res.data.data?.list || []);
    } catch (error) {
      console.log("getTemplateList Error:", error);
    }
  };

  useEffect(() => {
    getList(1, 8);
  }, []);

  const renderPoster = (item: any) => {
    router.push("/editor");
    setWork(item.workId);
  };

  return (
    <div className="w-full mt-10">
      <BaseList
        hasSearch={false}
        title={t("template-list")}
      >
        {templateList.map((item) => (
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
        <Link href={"/templates"}>
          <MoreButton className="mt-5">{t("discover-more")}</MoreButton>
        </Link>
      </div>
    </div>
  );
};

export default TemplateList;
