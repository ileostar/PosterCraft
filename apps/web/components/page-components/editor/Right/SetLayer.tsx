import { UseElementStore } from "@/store/element";
import { arrayMove } from "@/utils/arrayMove";
import { getParentElement } from "@/utils/getParentElement";
import {
  DragOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";

import InlineEdit from "./setLayer/InlineEdit";

function SetLayer() {
  const { Elements, updateElement, setIsCurrentLocked, setCurrentElement, setELements } =
    UseElementStore();
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [childStyle, setChildStyle] = useState({});

  useEffect(() => {
    if (parentRef.current) {
      const parentHeight = parentRef.current.offsetHeight;
      setChildStyle({ maxHeight: `${parentHeight}px`, overflowY: "auto" });
    }
  }, []);

  const handleChange = (id: string, key: string, value: boolean) => {
    if (key === "isHidden") {
      updateElement(id, undefined, undefined, undefined, value);
    } else if (key === "isLocked") {
      setIsCurrentLocked(value);
      updateElement(id, undefined, undefined, undefined, undefined, value);
    }
  };

  const data = {
    currentDragId: "",
    currentDragIndex: -1,
  };
  const [dragData, setDragData] = useState(data);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, id: string, index: number) => {
    setDragData({ ...dragData, currentDragId: id, currentDragIndex: index });
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const currentEle = getParentElement(e.target as HTMLElement, "parentItem");
    if (currentEle && currentEle.dataset.index) {
      const moveIndex = Number(currentEle.dataset.index);
      let list = Elements;
      list = arrayMove(list, dragData.currentDragIndex, moveIndex);
      setELements(list);
    }

    setDragData({ ...dragData, currentDragId: "" });
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="h-full"
      ref={parentRef}
    >
      <div
        style={childStyle}
        className="overflow-x-hidden"
        onDrop={(e) => onDrop(e)}
        onDragOver={(e) => onDragOver(e)}
      >
        {Elements.map((item, index) => (
          <div
            key={item.id}
            className={`${item.id == dragData.currentDragId ? "border-red-500 bg-red-500 text-white" : "border-gray-950"} parentItem flex justify-around w-full h-12 relative border-t border-l border-r  ${
              index === Elements.length - 1 ? "border-b" : ""
            }`}
            style={{ zIndex: 10 }}
            draggable
            onDragStart={(event) => onDragStart(event, item.id, index)}
            data-index={index}
            onMouseDown={() => {
              setCurrentElement(item.id);
            }}
          >
            <Tooltip
              className="w-1/6"
              title={item.isHidden ? "隐藏" : "显示"}
            >
              <button
                onClick={() => handleChange(item.id, "isHidden", !item.isHidden)}
                className="m-2 rounded-btn border border-gray-300"
              >
                {item.isHidden ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              </button>
            </Tooltip>
            <Tooltip
              className="w-1/6"
              title={item.isHidden ? "锁定" : "解锁"}
            >
              <button
                onClick={() => handleChange(item.id, "isLocked", !item.isLocked)}
                className="m-2 rounded-btn border border-gray-300"
              >
                {item.isLocked ? <LockOutlined /> : <UnlockOutlined />}
              </button>
            </Tooltip>
            <InlineEdit
              value={item.layerName}
              id={item.id}
            />
            <Tooltip
              className="w-1/6"
              title="拖动排序"
            >
              <button className="m-2 rounded-btn border border-gray-300">
                <DragOutlined />
              </button>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SetLayer;
