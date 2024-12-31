"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEditorStore } from "@/stores/editor";
import { arrayMove } from "@/utils/others/helper";
import { useCallback, useEffect, useRef, useState } from "react";

import InlineEdit from "./InlineEdit";

interface LayerItem {
  id: string;
  isHidden?: boolean;
  isLocked?: boolean;
  layerName?: string;
}

interface LayerAction {
  type: "isHidden" | "isLocked";
  icon: (value: boolean) => string;
  tooltip: (value: boolean) => string;
}

function SetLayer() {
  const { components, updateComponent, setActive, setComponents } = useEditorStore();
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [containerStyle, setContainerStyle] = useState({
    maxHeight: "0px",
    overflowY: "auto" as const,
  });

  const layerActions: LayerAction[] = [
    {
      type: "isHidden",
      icon: (value) => `icon-[carbon--view${value ? "-off" : ""}]`,
      tooltip: (value) => (value ? "显示图层" : "隐藏图层"),
    },
    {
      type: "isLocked",
      icon: (value) => `icon-[carbon--locked${value ? "" : "-unlocked"}]`,
      tooltip: (value) => (value ? "解锁图层" : "锁定图层"),
    },
  ];

  /** 更新容器高度 */
  const updateContainerHeight = useCallback(() => {
    if (parentRef.current) {
      const parentHeight = parentRef.current.offsetHeight;
      setContainerStyle({
        maxHeight: `${parentHeight}px`,
        overflowY: "auto",
      });
    }
  }, []);

  /** 处理图层属性更新 */
  const handleLayerUpdate = useCallback(
    (id: string, key: "isHidden" | "isLocked", value: boolean) => {
      updateComponent({
        key,
        value,
        id,
        isRoot: true,
      });
    },
    [updateComponent],
  );

  /** 处理图层拖拽 */
  const handleDragEnd = useCallback(
    (fromIndex: number, toIndex: number) => {
      setComponents(arrayMove([...components], fromIndex, toIndex));
    },
    [components, setComponents],
  );

  /** 渲染图层操作按钮 */
  const renderActionButton = useCallback(
    (item: LayerItem, action: LayerAction) => {
      const value = item[action.type];
      return (
        <div className="w-1/6 flex justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button
                  className="text-xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLayerUpdate(item.id, action.type, !value);
                  }}
                >
                  <span className={action.icon(!!value)} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{action.tooltip(!!value)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
    [handleLayerUpdate],
  );

  useEffect(() => {
    updateContainerHeight();
    window.addEventListener("resize", updateContainerHeight);
    return () => window.removeEventListener("resize", updateContainerHeight);
  }, [updateContainerHeight]);

  return (
    <div
      className="h-full"
      ref={parentRef}
    >
      <div
        style={containerStyle}
        className="overflow-x-hidden hiddenScrollbar"
      >
        {components.map((item: LayerItem, index) => (
          <div
            key={item.id}
            className="flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            onClick={() => setActive(item.id)}
          >
            {layerActions.map((action) => renderActionButton(item, action))}
            <InlineEdit
              value={item.layerName}
              id={item.id}
            />
            <div className="w-1/6 flex justify-center m-2 rounded-btn border border-gray-300">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <button
                      className="text-xl"
                      draggable
                      onDragStart={() => {}}
                      onDragEnd={() => handleDragEnd(index, index)}
                    >
                      <span className="icon-[carbon--drag-vertical]" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>拖动排序</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SetLayer;
