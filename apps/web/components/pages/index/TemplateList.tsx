"use client";

import BaseCard from "@/components/base/BaseCard";
import MoreButton from "@/components/shared/MoreButton";
import BaseList from "@/components/shared/ShowLists";
import Link from "next/link";
import React from "react";

interface TemplateListProps {}

const TemplateList: React.FC<TemplateListProps> = () => {
  return (
    <div className="w-full mt-10">
      <BaseList title="Template List">
        {Array.from({ length: 8 }, (_, i) => i + 1).map((item, index) => (
          <BaseCard
            key={index}
            title="Template Title"
            description="Project Description"
            imgUrl="https://cimg.co/news/100430/248406/polina-kondrashova-fhrwah2hmnm-unsplash.jpg"
          />
        ))}
      </BaseList>
      <div className="w-full flex items-center justify-center">
        <Link href={"/templates"}>
          <MoreButton className="mt-5">Discover More</MoreButton>
        </Link>
      </div>
    </div>
  );
};

export default TemplateList;
