"use client";

import BaseTooltips from "@/components/base/BaseTooltip";
import Dialog from "@/components/pages/editor/Middle/Dialog";
import EditorWrapper from "@/components/pages/editor/Middle/EditorWrapper";
import useHotKey from "@/hooks/useHotKey";
import { getWork } from "@/http/work";
import { useEditorStore } from "@/stores/editor";
import { useWorkStore } from "@/stores/work";
import { useEffect } from "react";

import "@/styles/pages/editor.css";

function Middle() {
  const {
    setActive,
    components,
    currentElement,
    page: { props: pageStyle },
    redo,
    undo,
    updateWork,
  } = useEditorStore();

  const { currentWorkId } = useWorkStore();
  useHotKey();

  /** 获取当前工作区内容 */
  async function getCurrentWorkContent() {
    if (currentWorkId && currentWorkId !== "") {
      const res = await getWork(currentWorkId);
      updateWork(res.data);
    }
  }

  useEffect(() => {
    getCurrentWorkContent();
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
        {/* 撤销 */}
        <BaseTooltips
          tooltipText={"撤销"}
          position={"top"}
        >
          <button
            className="mx-1 text-3xl text-gray-600 dark:text-gray-400 hover:text-primary"
            onClick={undo}
          >
            <span className="icon-[carbon--undo]"></span>
          </button>
        </BaseTooltips>
        {/* 重做 */}
        <BaseTooltips
          tooltipText={"重做"}
          position={"top"}
        >
          <button
            className="mx-1 text-3xl text-gray-600 dark:text-gray-400 hover:text-primary"
            onClick={redo}
          >
            <span className="icon-[carbon--redo]"></span>
          </button>
        </BaseTooltips>
      </div>

      {/* 编辑展示区 */}
      <div
        id="canvas-area"
        className="preview-list"
      >
        <div
          className="body-container"
          style={pageStyle}
        >
          {components.map((component) => (
            <EditorWrapper
              key={component.id}
              id={component.id}
              type={component.name}
              active={currentElement === component.id}
              hidden={component.isHidden}
              props={component.props}
              onSetActive={setActive}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Middle;
