"use client";

import { useEditorStore } from "@/stores/editor";
import { AllComponentProps } from "@poster-craft/bricks";
import { pickBy } from "lodash-es";
import React, { useRef, useState } from "react";

import "@/styles/base/resize-box.css";
import "@/styles/editor.css";

interface EditorWrapperProps {
  id: string;
  type: "text" | "image" | "shape";
  active?: boolean;
  hidden?: boolean;
  props: { [key: string]: any };
  onSetActive: (id: string) => void;
}

type directionType = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const EditorWrapper: React.FC<EditorWrapperProps> = ({
  id,
  type,
  active = false,
  hidden = false,
  props,
}) => {
  const { setActive, updateComponent } = useEditorStore();

  // 原始的编辑框height，width，top，left, +4和-2是算上边框的2px宽度的border
  let initHeight = props.height ? parseInt(props.height.replace(/(px|rem)/g, ""), 10) + 4 : 0;
  let initWidth = props.width ? parseInt(props.width.replace(/(px|rem)/g, ""), 10) + 4 : 0;
  let initTop = props.top ? parseInt(props.top.replace(/(px|rem)/g, ""), 10) - 2 : 0;
  let initLeft = props.left ? parseInt(props.left.replace(/(px|rem)/g, ""), 10) - 2 : 0;

  const tempSize = {
    height: initHeight,
    width: initWidth,
    top: initTop,
    left: initLeft,
  };

  /** 元素实例 */
  const elementRef = useRef<HTMLDivElement>(null);

  const [gap, setGap] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  /** 计算移动元素的位置 */
  const calculateMovePosition = (e: MouseEvent) => {
    const container = document.getElementById("canvas-area") as HTMLElement;
    const containerRect = container.getBoundingClientRect();
    // 计算相对于容器的位置
    const left = e.clientX - gap.x - containerRect.left;
    const top = e.clientY - gap.y - containerRect.top;

    return { left, top };
  };
  /** 更新元素位置 */
  const updatePosition = (data: { left: number; top: number; id: string }) => {
    const { id } = data;
    const updatedData = pickBy<number>(data, (v, k) => k !== "id");
    const keysArr = Object.keys(updatedData) as Array<keyof AllComponentProps>;
    const valuesArr = Object.values(updatedData).map((v) => v + "px");
    updateComponent({ key: keysArr, value: valuesArr, id });
  };
  /** 处理拖拽移动 */
  const handleDragElement = (e: React.MouseEvent<HTMLDivElement>) => {
    if (active) return;
    e.stopPropagation();
    const currentElement = elementRef.current;
    if (!elementRef.current) return;

    if (currentElement) {
      const { left, top } = currentElement.getBoundingClientRect();
      setGap({
        x: e.clientX - left,
        y: e.clientY - top,
      });
    }
    const handleMove = (e: MouseEvent) => {
      const { left, top } = calculateMovePosition(e);
      setIsMoving(true);
      if (currentElement) {
        currentElement.style.top = top + "px";
        currentElement.style.left = left + "px";
      }
    };
    const handleMouseUp = (e: MouseEvent) => {
      document.removeEventListener("mousemove", handleMove);
      if (isMoving) {
        const { left, top } = calculateMovePosition(e);
        updatePosition({
          left,
          top,
          id,
        });
        setIsMoving(false);
      }
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  /** 计算移动元素的尺寸 */
  const calculateSize = (direction: directionType, e: MouseEvent, position: any) => {
    const { clientX, clientY } = e;
    const { right, bottom, left, top } = position;
    const container = document.getElementById("canvas-area") as HTMLDivElement;
    const rightWidth = clientX - left;
    const leftWidth = right - clientX;
    const bottomHeight = clientY - top;
    const topHeight = bottom - clientY;
    const topOffset = clientY - container.offsetTop;
    const leftOffset = clientX - container.offsetLeft;
    switch (direction) {
      case "top-left":
        return {
          width: leftWidth,
          height: topHeight,
          left: leftOffset,
          top: topOffset,
        };
      case "top-right":
        return {
          width: rightWidth,
          height: topHeight,
          top: topOffset,
        };
      case "bottom-left":
        return {
          width: leftWidth,
          height: bottomHeight,
          left: leftOffset,
        };
      case "bottom-right":
        return {
          width: rightWidth,
          height: bottomHeight,
        };
      default:
        break;
    }
  };
  /** 缩放元素 */
  const handleResize = (direction: directionType, e: React.MouseEvent<HTMLElement>) => {
    if (!active) return;
    e.stopPropagation();
    setActive(id);
    const { left, top, bottom, right } = elementRef.current!.getBoundingClientRect();
    // 监听mousemove和mouseup事件
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const size = calculateSize(direction, moveEvent, { left, top, bottom, right });
      const { style } = elementRef.current!;
      if (size) {
        style.width = size.width + "px";
        style.height = size.height + "px";
        if (size.left) {
          style.left = size.left + "px";
        }
        if (size.top) {
          style.top = size.top + "px";
        }

        tempSize.width = Math.floor(size.width) - 4;
        tempSize.height = Math.floor(size.height) - 4;
        tempSize.left = size.left ? size.left + 2 : initLeft + 2;
        tempSize.top = size.top ? size.top + 2 : initTop + 2;
      }
    };
    const handleMouseUp = () => {
      updatePosition({
        left: tempSize.left,
        top: tempSize.top,
        id,
      });
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return hidden ? null : (
    <div
      ref={elementRef}
      className={`edit-wrapper ${active ? "active" : ""}`}
      style={{
        ...props,
        cursor: active ? "move" : "grab",
      }}
      onClick={(e) => {
        e.stopPropagation();
        setActive(id);
        if (props.url) {
          window.open(props.url);
        }
      }}
      onMouseDown={handleDragElement}
    >
      {type === "text" && props.text}
      {active && (
        <div className="resizers">
          <div
            className="resizer top-left"
            onMouseDown={(e) => handleResize("top-left", e)}
          />
          <div
            className="resizer top-right"
            onMouseDown={(e) => handleResize("top-right", e)}
          />
          <div
            className="resizer bottom-left"
            onMouseDown={(e) => handleResize("bottom-left", e)}
          />
          <div
            className="resizer bottom-right"
            onMouseDown={(e) => handleResize("bottom-right", e)}
          />
        </div>
      )}
    </div>
  );
};

export default EditorWrapper;
