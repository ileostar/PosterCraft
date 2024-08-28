"use client";

import useHotKey from "@/hooks/useHotKey";
import { UseElementStore } from "@/store/element";

import ChangePositionComponent from "../../base/ChangePositionComponent";
import ResizeComponent from "../../base/ResizeComponent";
import { Button } from "@/components/ui/button";

function Middle(props: any) {
  const { Elements, setIsElement, currentElement, setCurrentElement, pageBackgroundStyle,redo,undo } =
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
      <Button onClick={()=>{undo()}}>撤销</Button>
      <Button onClick={()=>redo()}>恢复</Button>
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
