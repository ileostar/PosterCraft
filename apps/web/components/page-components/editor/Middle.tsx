"use client";

import useHotKey from "@/hooks/useHotKey";
import { UseElementStore } from "@/store/element";

import ChangePositionComponent from "../../base/ChangePositionComponent";
import ResizeComponent from "../../base/ResizeComponent";

function Middle(props: any) {
  const { Elements, setIsElement, currentElement, setCurrentElement, pageBackgroundStyle } =
    UseElementStore();

    useHotKey();

  return (
    <button
      className="bg-[#f0f2f5] w-3/5 flex justify-center items-center flex-col"
      onClick={() => {
        setIsElement(false);
        setCurrentElement("");
      }}
    >
      <h3>海报区域</h3>
      <div
        id="mid-container"
        className="bg-white mt-5"
        style={{
          ...pageBackgroundStyle,
          width: "375px",
          height: "667px",
          position: "relative",
          overflow: "auto",
        }}
      >
        {Elements.map((item: any) =>
          item.id == currentElement ? (
            <div
              key={item.id}
              className={` ${item.isHidden ? "invisible" : ""}`}
            >
              <ResizeComponent item={item} />
            </div>
          ) : (
            <div
              key={item.id}
              className={` ${item.isHidden ? "invisible" : ""}`}
            >
              <ChangePositionComponent item={item} />
            </div>
          ),
        )}
      </div>
    </button>
  );
}

export default Middle;
