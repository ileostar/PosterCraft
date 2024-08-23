"use client";

import Card from "../../base/Card";
import Search from "../../base/MySearch";

function List({ mode }: Readonly<{ mode: string }>) {
  return (
    <div className="w-4/5 mx-auto mb-28 relative">
      <div
        className="bg-red-500 w-1/6 text-center text-white pt-4 pb-4 font-semibold"
        style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)" }}
      >
        {mode == "模板" ? "热门海报模板" : "我的作品"}
      </div>
      <div className="absolute right-8 top-0">
        <Search searchMessage={mode == "模板" ? "查找热门海报模板" : "查找我的作品"} />
      </div>
      <div className="flex flex-wrap w-full justify-between lg:gap-1 md:gap-0.5 items-center">
        {Array.from({ length: 7 }, (_, index) => (
          <Card key={index} />
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
  );
}

export default List;
