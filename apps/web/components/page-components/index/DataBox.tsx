"use client";

import { useScrollAnimate } from "@/hooks/useScrollAnimate";
import Image from "next/image";
import { useRef } from "react";

function Index(props: any) {
  const boxRef = useRef<HTMLDivElement>(null); // 指定ref的类型为HTMLDivElement
  useScrollAnimate(boxRef);

  return (
    <div
      className="mt-8 mb-8 flex max-w-7xl mx-auto flex-col lg:flex-row box"
      ref={boxRef}
    >
      <div className="card bg-base-300 rounded-box grid h-32 flex-grow place-items-center ">
        <Image
          src="/余额.png"
          alt="balances"
          width={0}
          height={0}
          sizes="100vw"
          className="w-14 h-auto"
        />
        <div className="text-lg">海量H5模板</div>
        <div className="text-sm text-gray-500">一键生成，一分钟轻松制作</div>
      </div>
      <div className="divider lg:divider-horizontal"></div>
      <div className="card bg-base-300 rounded-box grid h-32 flex-grow place-items-center">
        <Image
          src="/体验好.png"
          alt="good experience"
          width={0}
          height={0}
          sizes="100vw"
          className="w-14 h-auto"
        />
        <div className="text-lg">极致体验</div>
        <div className="text-sm text-gray-500">用户的一致选择</div>
      </div>
      <div className="divider lg:divider-horizontal"></div>
      <div className="card bg-base-300 rounded-box grid h-32 flex-grow place-items-center">
        <div className="stats shadow w-11/12">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#ef4444"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">本月下载量</div>
            <div className="stat-value">31K</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#ef4444"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">今日下载量</div>
            <div className="stat-value">4,200</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#ef4444"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">本月新增用户</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
