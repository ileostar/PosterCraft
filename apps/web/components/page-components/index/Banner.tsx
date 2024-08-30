"use client";

import { Loading } from "@/components/base/Loading";
import { useEffect, useRef, useState } from "react";

import ThreeModel from "../../model/MyModel";

interface BannerProps {}

const Banner: React.FC<BannerProps> = () => {
  const boxRef = useRef<HTMLDivElement>(null); // 指定ref的类型为HTMLDivElement
  const [boxWidth, setBoxWidth] = useState<number | undefined>(undefined);
  const [boxHeight, setBoxHeight] = useState<number | undefined>();
  const [isReady, setIsReady] = useState(false); //dom是否已挂载

  useEffect(() => {
    if (boxRef.current) {
      const width = boxRef.current.offsetWidth;
      const height = boxRef.current.offsetHeight;
      setBoxWidth(width);
      setBoxHeight(height);
      console.log(`Width: ${width}, Height: ${height}`);
      setIsReady(true);
    }
  }, []);

  const RenderThreeD = () => {
    if (isReady) {
      return (
        <ThreeModel
          boxWidth={boxWidth}
          boxHeight={boxHeight}
        />
      );
    }
    // 如果还没准备好，可以渲染一个加载指示器或其他占位符
    return (
      <div className="flex justify-center items-center h-full">
        <Loading />
      </div>
    );
  };
  return (
    <div className="h-[80vh] my-12 mx-auto max-w-7xl px-6 sm:pl-5 sm:pr-0 space-y-20 sm:space-y-52 lg:space-y-0 lg:flex lg:items-center lg:pl-8">
      <div className="w-full h-full flex flex-col md:flex-row justify-center items-center">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
          <div className="flex">
            <div className="relative flex items-center gap-x-4 rounded-full px-4 py-1 leading-6 text-sm xl:text-base text-white xl:font-semibold border border-[#CACACA]/60 bg-transparent hover:bg-[#E730CA] hover:border-transparent transition-colors">
              <a
                href="#"
                className="flex items-center gap-x-1"
              >
                New update is coming
                <svg
                  className="-mr-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
          <h1 className="mt-10 max-w-lg text-4xl sm:text-7xl lg:text-6xl font-semibold text-white xl:text-7xl tracking-tight">
            Discover your own NFT <span className="text-[#FF33DE]">here!</span>
          </h1>
          <p className="mt-6 xl:text-lg font-medium leading-8 text-white max-w-[553px]">
            Buy and Sell your favorite NFT here from the top artist in the world, more than 10.000
            collection are available just for you
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <a
              href="#"
              className="rounded-xl bg-[#E730CA] w-32 xl:w-40 py-2.5 font-semibold text-sm xl:text-base text-white text-center border border-transparent hover:border-[#E730CA] hover:bg-transparent focus-visible:outline-none focus-visible:outline-0 focus-visible:outline-offset-0 focus-visible:outline-transparent transition-colors"
            >
              Find NFT
            </a>
            <a
              href="#"
              className="border border-[#E730CA] hover:border-[#E730CA]/30 bg-transparent hover:bg-[#E730CA]/30 rounded-xl w-32 xl:w-40 py-2.5 font-semibold leading-6 text-sm xl:text-base text-[#E730CA] hover:text-white text-center transition-colors"
            >
              Create NFT
            </a>
          </div>
        </div>
      </div>
      <div className="w-full h-full hidden sm:justify-center sm:items-center sm:flex  ">
        <div
          className="flex-1 flex items-center justify-center w-3/5 h-4/5 overflow-visible  xl:min-w-[40vw] "
          ref={boxRef}
        >
          {RenderThreeD()}
        </div>
      </div>
    </div>
  );
};

export default Banner;
