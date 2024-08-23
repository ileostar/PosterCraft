"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import "../../style/card.css";
import "../../style/scrollAnimate.css";

import { useScrollAnimate } from "@/hooks/useScrollAnimate";
import { useRef } from "react";

const Card: React.FC = () => {
  const router = useRouter();
  // const handleClick = () => {
  //   router.push("/editor");
  // };

  const boxRef = useRef<HTMLDivElement>(null); // 指定ref的类型为HTMLDivElement
  useScrollAnimate(boxRef);

  return (
    <div className="mt-12 lg:w-[24%] md:w-[49%] w-full relative flex flex-col rounded-xl saturate-100 backdrop-blur-[10px] bg-clip-border text-gray-700 shadow-md shadow-gray-300/50">
      <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl  bg-background/30  bg-clip-border text-white shadow-lg shadow-red-gray-500/40 bg-gradient-to-r from-red-500 to-red-600"></div>
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
export default Card;
