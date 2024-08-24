"use client";

import Search from "../../base/MySearch";
import PostCard from "../../base/PostCard";

function Index(props: any) {
  return (
    <div>
      <div className="min-w-96 p-5 sm:p-16 md:p-20 lg:p-32 xl:p-0 sm:max-w-7xl mx-auto relative">
        <div className="flex justify-between items-center">
          <div
            className="bg-red-500 w-1/6 text-center text-white pt-4 pb-4 font-semibold"
            style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)" }}
          >
            热门海报模板
          </div>
          <Search searchMessage={"查找热门海报"} />
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
        <div className="join absolute right-40 mt-8 w-20">
          <button className="join-item btn">«</button>
          <button className="join-item btn">Page 22</button>
          <button className="join-item btn">»</button>
        </div>
      </div>
      <div
        className="min-w-96 p-5 sm:p-16 md:p-20 lg:p-32 xl:p-0 sm:max-w-7xl mx-auto relative mb-32"
        id="my-work"
      >
        <div className="flex justify-between items-center">
          <div
            className="bg-red-500 w-1/6 text-center text-white pt-4 pb-4 font-semibold"
            style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)" }}
          >
            我的作品
          </div>
          <Search searchMessage={"查找我的作品"} />
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
        <div className="join absolute right-40 mt-8 w-20">
          <button className="join-item btn">«</button>
          <button className="join-item btn">Page 22</button>
          <button className="join-item btn">»</button>
        </div>
      </div>
    </div>
  );
}

export default Index;
