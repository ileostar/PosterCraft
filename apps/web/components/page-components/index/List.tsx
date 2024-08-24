"use client";

import React from "react";

import Search from "../../base/MySearch";
import PostCard from "../../base/PostCard";

interface ListProps {
  readonly title: string;
  readonly searchText?: string;
}

const List: React.FC<ListProps> = ({ title, searchText }) => {
  return (
    <div className="min-w-96 p-5 sm:p-16 md:p-20 lg:p-32 xl:p-0 sm:max-w-7xl mx-auto relative">
      <div className="flex justify-between items-center">
        <div
          className="bg-red-500 w-1/6 text-center text-white pt-4 pb-4 font-semibold"
          style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)" }}
        >
          {title}
        </div>
        <Search searchMessage={searchText ?? "请输入搜索内容"} />
      </div>
      <div className="flex flex-wrap w-full justify-between lg:gap-1 md:gap-0.5 items-center">
        {Array.from({ length: 7 }, (_, index) => (
          <PostCard key={index} />
        ))}
        {Array.from({ length: 4 - (7 % 4) }, (_, index) => (
          <div
            className="w-[24%]"
            key={index}
          />
        ))}
      </div>
      <div className="join mt-2">
        <button className="join-item btn">«</button>
        <button className="join-item btn">Page 22</button>
        <button className="join-item btn">»</button>
      </div>
    </div>
  );
};
export default List;
