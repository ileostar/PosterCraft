"use client";

import Link from "next/link";

import Head from "../../components/page-components/index/Head";
import Search from "@/components/base/Search";
import Card from "@/components/base/Card";

function Index(props: any) {
  return (
    <div>
      <Head />
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
          {Array.from({ length: 8 }, (_, index) => (
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
