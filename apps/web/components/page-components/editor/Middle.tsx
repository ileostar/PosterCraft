"use client";

import { UseElementStore } from "@/store/element";
import { useEffect, useRef, useState } from "react";
import DraggableComponent from "../../base/DraggableComponent";

function Middle(props: any) {
  const { Elements, setIsElement } = UseElementStore();

  return (
    <div
      className="bg-[#f0f2f5] w-3/5 flex justify-center items-center flex-col"
      onClick={() => setIsElement(false)}
    >
      <h3>海报区域</h3>
      <div
        className="bg-white mt-5"
        style={{ width: "375px", height: "667px", position: "relative", overflow: "auto" }}
      >
        {Elements.map((item: any) => (
          // <div
          //   key={item.id}
          //   onClick={(e) => {
          //     e.stopPropagation();
          //     setCurrentElement(item.id);
          //     setIsElement(true);
          //     if (item.url) {
          //       window.open(item.url);
          //     }
          //   }}
          //   style={{
          //     position: "absolute",
          //     ...item.props
          //   }}
          // >
          //   {item.type === "text" && item.text}
          // </div>
          <DraggableComponent key={item.id} item={item}/>
        ))}
      </div>
    </div>
  );
}

export default Middle;
