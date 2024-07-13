"use client";

import { useRouter } from "next/navigation";

import "../style/card.css";
import  "../style/scrollAnimate.css"
import { useEffect, useRef } from "react";
import { useScrollAnimate } from "@/hooks/useScrollAnimate";

function Card() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/edit-template");
  };


  // const boxRef = useRef<HTMLDivElement>(null); // 指定ref的类型为HTMLDivElement
  // useEffect(() => {  
  //   const handleScroll = () => {  
  //     const box = boxRef.current;  
  //     if (box) {  
  //       const isBoxVisible = box.getBoundingClientRect().top+100 < window.innerHeight;  
  //       if (isBoxVisible && !box.classList.contains('isVisible')) {  
  //         console.log(111)
  //         box.classList.add('isVisible');  
  //       }  
  //       if (!isBoxVisible && box.classList.contains('isVisible')) {  
  //         box.classList.remove('isVisible');  
  //       }  
  //     }  
  //   };  
  
  //   window.addEventListener('scroll', handleScroll);  
  
  //   return () => {  
  //     window.removeEventListener('scroll', handleScroll);  
  //   };  
  // }, []); 
  const boxRef = useRef<HTMLDivElement>(null); // 指定ref的类型为HTMLDivElement
  useScrollAnimate(boxRef);

  return (
    <div
      className="card bg-base-100 w-80 shadow-xl mb-7 mt-7 hover-zoom ml-14 box"
      onClick={handleClick}
         ref={boxRef}  
    >
      <figure>
        <img
          className="h-96 w-full object-cover img"
          src="/num.jpg"
          alt="Shoes"
        />
        {/* <img
          className="h-96 object-cover img"
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        /> */}
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
            <img
              className="h-6 object-cover"
              src="/人数数量.png"
            />
            <div className="ml-2 text-lg text-red-500">1121</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
