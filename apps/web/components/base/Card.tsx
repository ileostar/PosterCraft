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
    <div
      className="lg:w-[24%] md:w-[49%]  w-full card bg-base-100 shadow-xl my-7 hover-zoom box"
      // onClick={handleClick}
      ref={boxRef}
    >
      <figure>
        <Image
          src="/num.jpg"
          alt="Shoes"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          Shoes!
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-between mt-3">
          {/* <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div> */}
          <div className="text-lg">作者：leoaa</div>
          <div className="flex justify-around">
            <Image
              src="/人数数量.png"
              alt="Shoes"
              width={0}
              height={0}
              sizes="100vw"
              className="w-auto h-6"
            />
            <div className="ml-2 text-lg text-red-500">1121</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
