"use client";

import Link from "next/link";

function Head(props: any) {
  return (
    // <div className="flex flex-row  bg-[#f2f2f2] pb-4 pt-4 border-b-8  border-red-500">
    <div className="flex flex-row   bg-red-500 pb-4 pt-4  fixed w-full z-10  bg-opacity-90 hover:bg-opacity-100">
      <div className="basis-1/2 ml-8 text-[#f2f2f2]  font-bold text-3xl leading-loose">
        <Link href="/">POSTERCRAFT</Link>
      </div>
      <div className="basis-1/6"></div>
      <div className="basis-1/6"></div>
      <div className="basis-1/6"></div>
      {/* <div className="basis-1/6 pt-2 pb-2 mr-8 text-center leading-loose text-lg hover:bg-gray-300 font-medium text-[#f2f2f2]"> */}
      <div className="basis-1/6 pt-2 pb-2 mr-8 text-center leading-loose text-lg hover:bg-red-600  font-medium text-[#f2f2f2] rounded-full">
        <Link href="/#my-work">我的作品</Link>
      </div>
      <div className="basis-1/6 pt-2 pb-2 mr-8 text-center leading-loose text-lg hover:bg-red-600 font-medium text-[#f2f2f2] rounded-full">
        我的账号
      </div>
      <div className="basis-1/6 mr-8 pt-2 pb-2 text-center leading-loose text-lg hover:bg-red-600 font-medium text-[#f2f2f2] rounded-full  ">
        <span>创建设计</span>
      </div>
    </div>
  );
}

export default Head;
