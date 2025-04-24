"use client";

import BaseTooltips from "@/components/base/BaseTooltip";
import ChangePosition from "@/components/ChangePosition";
import ContextMenu from "@/components/ContextMenu";
import Dialog from "@/components/editor/Middle/Dialog";
import ResizeComponent from "@/components/ResizeComponent";
import useGetScreenRatio from "@/hooks/useGetScreenRatio";
import useHotKey from "@/hooks/useHotKey";
import { getWork } from "@/http/work";
import { useElementStore } from "@/stores/element";
import { useWorkStore } from "@/stores/work";
import { useEffect } from "react";

function Middle(props: any) {
  const {
    Elements,
    setIsElement,
    setPageBackgroundStyle,
    setElements,
    currentElement,
    setCurrentElement,
    pageBackgroundStyle,
    redo,
    undo,
    deleteElement,
    setPastedElement,
    setCopyElement,
    ifRedo,
    ifUndo,
  } = useElementStore();
  const { currentWorkId } = useWorkStore();

  useHotKey();
  const ratio = useGetScreenRatio();

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

  const getTheWork = async () => {
    if (currentWorkId) {
      const res = await getWork(currentWorkId);
      setElements(res.data.data.content.components ?? []);
      setPageBackgroundStyle({ ...res.data.data.content.props });
    } else {
      setElements([]);
      //设置默认背景样式
      setPageBackgroundStyle({
        backgroundColor: "",
        backgroundImage: ``,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      });
    }
  };

  useEffect(() => {
    getTheWork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="bg-[#f0f2f5] w-3/5 flex justify-center items-center flex-col relative"
      onClick={() => {
        setIsElement(false);
        setCurrentElement("");
      }}
    >
      <h3 className={` ${ratio > 1 ? "absolute top-10" : ""}`}>海报区域</h3>

      <div className="absolute right-8 top-14 flex flex-row">
        <BaseTooltips
          tooltipText={"快捷键提示"}
          position={"top"}
        >
          <Dialog>
            <button className={`mx-1 text-3xl text-gray-400 hover:text-red-500 `}>
              <span className="icon-[carbon--help]"></span>
            </button>
          </Dialog>
        </BaseTooltips>
        <BaseTooltips
          tooltipText={"回退"}
          position={"top"}
        >
          <button
            className={`mx-1 text-3xl text-gray-400 ${!ifUndo && "hover:text-red-500"} ${!ifUndo && "text-gray-500"}`}
            disabled={ifUndo}
            onClick={() => undo()}
          >
            <span className="icon-[carbon--previous-outline]"></span>
          </button>
        </BaseTooltips>
        <BaseTooltips
          tooltipText={"前进"}
          position={"top"}
        >
          <button
            className={`mx-1 text-3xl text-gray-400 ${!ifRedo && "hover:text-red-500"} ${!ifRedo && "text-gray-500"}`}
            disabled={ifRedo}
            onClick={() => redo()}
          >
            <span className="icon-[carbon--next-outline]"></span>
          </button>
        </BaseTooltips>
      </div>

      <div
        id="mid-container"
        className={`bg-white mt-5 ${ratio > 1 ? "scale-[0.8]" : ""}`}
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
