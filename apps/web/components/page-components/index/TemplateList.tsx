"use client";

import { configResponsive, useResponsive } from "ahooks";

import Card from "../../base/Card";
import Search from "../../base/MySearch";

configResponsive({
  sm: 0,
  md: 768,
  lg: 1024,
});

function Index(props: any) {
  const responsive = useResponsive();

  return (
    <div>
      <div className="w-4/5 mx-auto relative">
        <div
          className="bg-red-500 w-1/6 text-center text-white pt-4 pb-4 font-semibold"
          style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)" }}
        >
          热门海报模板
        </div>
        <div className="absolute right-8 top-0">
          <Search searchMessage={"查找热门海报"} />
        </div>
        <div className="flex flex-wrap w-full justify-between lg:gap-1 md:gap-0.5 items-center">
          {Array.from({ length: 6 }, (_, index) => (
            <Card key={index} />
          ))}
          {responsive?.lg
            ? Array.from({ length: 4 - (6 % 4) }, (_, index) => (
                <div
                  className="w-[24%]"
                  key={index}
                />
              ))
            : null}
          {!responsive?.lg && responsive?.md
            ? Array.from({ length: 4 - (6 % 4) }, (_, index) => (
                <div
                  className="w-[49%]"
                  key={index}
                />
              ))
            : null}
        </div>
        <div className="join absolute right-40 mt-8 w-20">
          <button className="join-item btn">«</button>
          <button className="join-item btn">Page 22</button>
          <button className="join-item btn">»</button>
        </div>
      </div>
      <div
        className="w-4/5 mx-auto relative mt-32 mb-32"
        id="my-work"
      >
        <div
          className="bg-red-500 w-1/6 text-center text-white pt-4 pb-4 font-semibold"
          style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)" }}
        >
          我的作品
        </div>
        <div className="absolute right-8 top-0">
          <Search searchMessage={"查找我的作品"} />
        </div>
        <div className="flex flex-wrap  items-center justify-start">
          {Array.from({ length: 4 }, (_, index) => (
            <Card key={index} />
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
