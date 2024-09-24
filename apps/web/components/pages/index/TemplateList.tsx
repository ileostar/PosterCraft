"use client";

import { getTemplateList } from "@/api/template";
import { createWorkResponse } from "@/api/types/work";
import BaseCard from "@/components/base/BaseCard";
import MoreButton from "@/components/shared/MoreButton";
import BaseList from "@/components/shared/ShowLists";
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

  const [templateList, setTemplateList] = useState<createWorkResponse[]>([]);

  const getList = async (pageIndex?: number, pageSize?: number, title?: string) => {
    const res = await getTemplateList({ pageIndex, pageSize, title });
    setTemplateList(res.data.data.list);
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
            key={item.workId}
            title={item.title}
            description={item.desc}
            imgUrl="https://cimg.co/news/100430/248406/polina-kondrashova-fhrwah2hmnm-unsplash.jpg"
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
