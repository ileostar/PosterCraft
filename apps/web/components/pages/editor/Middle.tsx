"use client";

import ChangePosition from "@/components/shared/ChangePosition";
import ContextMenu from "@/components/shared/ContextMenu";
import ResizeComponent from "@/components/shared/ResizeComponent";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useHotKey from "@/hooks/useHotKey";
import { UseElementStore } from "@/stores/element";

function Middle(props: any) {
  const {
    Elements,
    setIsElement,
    currentElement,
    setCurrentElement,
    pageBackgroundStyle,
    redo,
    undo,
    deleteElement,
    setPastedElement,
    setCopyElement,
  } = UseElementStore();

  useHotKey();

  const actionItem = [
    {
      hotkey: "ctrl+c",
      text: "复制图层",
      action: () => {
        setCopyElement(currentElement);
      },
    },
    {
      hotkey: "ctrl+v",
      text: "粘贴图层",
      action: () => {
        setPastedElement();
      },
    },
    {
      hotkey: "delete",
      text: "删除图层",
      action: () => {
        deleteElement(currentElement);
      },
    },
    {
      hotkey: "esc",
      text: "取消选中",
      action: () => {
        setCurrentElement("");
      },
    },
  ];

  return (
    <div
      className="bg-[#f0f2f5] w-3/5 flex justify-center items-center flex-col relative"
      onClick={() => {
        setIsElement(false);
        setCurrentElement("");
      }}
    >
      <h3>海报区域</h3>

      <div className="absolute right-8 top-8">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className="text-4xl hover:text-red-500"
                onClick={() => undo()}
              >
                <span className="icon-[carbon--skip-back-outline]"></span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>回退</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className="text-4xl hover:text-red-500"
                onClick={() => redo()}
              >
                <span className="icon-[carbon--skip-forward-outline]"></span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>前进</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

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
        <ContextMenu item={actionItem} />

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
              <ChangePosition item={item} />
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default Middle;
