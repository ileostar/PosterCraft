"use client";

import BaseCard from "@/components/base/BaseCard";
import BaseList from "@/components/base/BaseList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface TemplateListProps {}

const TemplateList: React.FC<TemplateListProps> = () => {
  return (
    <div className="w-full mt-10">
      <BaseList title="Template List">
        {Array.from({ length: 8 }, (_, i) => i + 1).map((item, index) => (
          <BaseCard imgUrl="https://cimg.co/news/100430/248406/polina-kondrashova-fhrwah2hmnm-unsplash.jpg" />
        ))}
      </BaseList>
      <div className="w-full flex items-center justify-center">
        <Link
          href={"/template-list"}
          className="inline-block rounded-xl bg-[#E730CA] px-4 py-2.5 mt-6 font-semibold text-sm xl:text-base text-white text-center border border-transparent hover:border-[#E730CA] hover:bg-transparent focus-visible:outline-none focus-visible:outline-0 focus-visible:outline-offset-0 focus-visible:outline-transparent transition-colors"
        >
          查看更多
        </Link>
      </div>
    </div>
  );
};

export default TemplateList;
