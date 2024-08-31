"use client";

import { useRouter } from "next/navigation";

import "@/style/card.css";
import "@/style/scrollAnimate.css";

import { useScrollAnimate } from "@/hooks/useScrollAnimate";
import { useRef } from "react";

const PostCard: React.FC = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/editor");
  };

  const boxRef = useRef<HTMLDivElement>(null); // 指定ref的类型为HTMLDivElement
  useScrollAnimate(boxRef);

  return (
    <div
      className="mt-36 xl:w-[24%] sm:w-[49%] md:w-[32%] w-full relative flex flex-col rounded-xl saturate-100 backdrop-blur-[10px] bg-clip-border text-gray-700 shadow-md shadow-gray-300/50 box"
      ref={boxRef}
      onClick={() => handleClick()}
    >
      <div className="relative mx-4 -mt-32 h-60 sm:h-80 xl:h-96 overflow-hidden rounded-xl  bg-background/30  bg-clip-border text-white shadow-lg shadow-red-gray-500/40 bg-gradient-to-r from-red-500 to-red-600"></div>
      <div className="p-6">
        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-red-gray-900 antialiased">
          Tailwind card
        </h5>
        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc felis ligula.
        </p>
      </div>
      <div className="p-6 pt-0">
        <button
          data-ripple-light="true"
          type="button"
          className="select-none rounded-lg bg-red-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Read More
        </button>
      </div>
    </div>
  );
};
export default PostCard;
