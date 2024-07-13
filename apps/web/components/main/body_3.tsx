"use client";

import Card from "../card";
import Search from "../search";

function Index(props: any) {
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
        <div className="flex flex-wrap justify-start items-center">
          {Array.from({ length: 7 }, (_, index) => (
            <Card key={index} />
          ))}
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
