"use client";

import BaseTooltips from "@/components/base/BaseTooltip";
import Dialog from "@/components/pages/editor/Middle/Dialog";
import ChangePosition from "@/components/shared/ChangePosition";
import ContextMenu from "@/components/shared/ContextMenu";
import ResizeComponent from "@/components/shared/ResizeComponent";
import useGetScreenRatio from "@/hooks/useGetScreenRatio";
import useHotKey from "@/hooks/useHotKey";
import { getWork } from "@/http/work";
import { useEditorStore } from "@/stores/editor";
import { useWorkStore } from "@/stores/work";
import { useEffect } from "react";

function Middle() {
  const {
    setActive,
    components,
    currentElement,
    page: { props: pageStyle },
    updateWork,
    copyComponent,
    pasteComponent,
    deleteComponent,
  } = useEditorStore();

  const { currentWorkId } = useWorkStore();
  useHotKey();
  const ratio = useGetScreenRatio();

  /** 快捷键动作 */
  const actionItems = [
    {
      hotkey: "ctrl+c",
      text: "复制图层",
      action: () => {
        copyComponent(currentElement);
      },
    },
    {
      hotkey: "ctrl+v",
      text: "粘贴图层",
      action: () => {
        pasteComponent();
      },
    },
    {
      hotkey: "delete",
      text: "删除图层",
      action: () => currentElement && deleteComponent(currentElement),
    },
    {
      hotkey: "esc",
      text: "取消选中",
      action: () => {
        setActive("");
      },
    },
  ];

  /** 获取当前工作区内容 */
  async function getCurrentWorkContent() {
    if (currentWorkId && currentWorkId !== "") {
      const res = await getWork(currentWorkId);
      updateWork(res.data);
    }
  }

  useEffect(() => {
    getCurrentWorkContent();
    console.log("lllllllllll", components);
  }, []);

  return (
    <div
      className="bg-gray-100 dark:bg-gray-900 w-3/5 flex justify-center items-center flex-col relative"
      onClick={() => setActive("")}
    >
      {/* 操作栏 */}
      <div className="absolute right-8 top-14 flex flex-row">
        <BaseTooltips
          tooltipText={"快捷键提示"}
          position={"top"}
        >
          <Dialog>
            <button className="mx-1 text-3xl text-gray-600 dark:text-gray-400 hover:text-primary">
              <span className="icon-[carbon--help]"></span>
            </button>
          </Dialog>
        </BaseTooltips>
      </div>

      {/* 编辑展示区 */}
      <div
        id="mid-container"
        className={`bg-white dark:bg-gray-800 mt-5 ${ratio > 1 ? "scale-[0.8]" : ""}`}
        style={{
          ...pageStyle,
          width: "375px",
          height: "667px",
          position: "relative",
          overflow: "auto",
        }}
      >
        <ContextMenu item={actionItems} />

        {components.map((item) => (
          <div
            key={item.id}
            className={item.isHidden ? "invisible" : ""}
          >
            {item.id === currentElement ? (
              <ResizeComponent item={item} />
            ) : (
              <ChangePosition item={item} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Middle;
