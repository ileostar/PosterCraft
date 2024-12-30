"use client";

import React, { useEffect, useRef } from "react";

import "@/styles/base/resize-box.css";

import { useEditorStore } from "@/stores/editor";
import { AllComponentProps } from "@poster-craft/bricks";
import { pickBy } from "lodash-es";

interface EditorWrapperProps {
  id: string;
  type: string;
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
  const { setActive, moveComponent, updateComponent } = useEditorStore();

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

  const resizeBoxRef = useRef<HTMLDivElement>(null);
  const contentBoxRef = useRef<HTMLDivElement>(null);

  /** 计算移动元素的尺寸 */
  const calculateSize = (direction: directionType, e: MouseEvent, position: any) => {
    const { clientX, clientY } = e;
    const { right, bottom, left, top } = position;
    const container = document.getElementById("mid-container") as HTMLDivElement;
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
  /** 开始移动元素 */
  const handleMouseDown = (direction: directionType, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setActive(id);
    const { left, top, bottom, right } = resizeBoxRef.current!.getBoundingClientRect();
    // 监听mousemove和mouseup事件
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const size = calculateSize(direction, moveEvent, { left, top, bottom, right });
      const { style } = resizeBoxRef.current!;
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

      // 移除mousemove和mouseup事件监听器
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // 绑定事件监听器到document，以便在移动时也能触发
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    //把编辑框移到元素位置
    if (resizeBoxRef.current) {
      //border的宽度为2px
      resizeBoxRef.current.style.height = `${initHeight}px`;
      resizeBoxRef.current.style.width = `${initWidth}px`;
      resizeBoxRef.current.style.left = `${initLeft}px`;
      resizeBoxRef.current.style.top = `${initTop}px`;
    }
  }, [initHeight, initLeft, initTop, initWidth]);
  let top = props.top ? parseInt(props.top.replace(/(px|rem)/g, ""), 10) : 0;
  let left = props.left ? parseInt(props.left.replace(/(px|rem)/g, ""), 10) : 0;

  const position = { x: left, y: top };
  const draggableRef = useRef<HTMLDivElement>(null);

  const handleMouseDownX = (e: React.MouseEvent<HTMLDivElement>) => {
    // 阻止默认行为（如选择文本）
    e.preventDefault();
    // 记录初始鼠标位置
    const initialMouseX = e.clientX;
    const initialMouseY = e.clientY;

    // 监听mousemove和mouseup事件
    const handleMouseMove = (moveEvent: MouseEvent) => {
      // 更新元素位置
      left = moveEvent.clientX - initialMouseX + position.x;
      top = moveEvent.clientY - initialMouseY + position.y;

      if (draggableRef.current) {
        draggableRef.current.style.left = `${moveEvent.clientX - initialMouseX + position.x}px`;
        draggableRef.current.style.top = `${moveEvent.clientY - initialMouseY + position.y}px`;
      }
    };

    const handleMouseUp = () => {
      position.x = left;
      position.y = top;

      moveComponent({ direction: "Up", amount: 1, id });
      // setCurrentPosition(position.x, position.y);

      // 移除mousemove和mouseup事件监听器
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // 绑定事件监听器到document，以便在移动时也能触发
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const updatePosition = (data: { left: number; top: number; id: string }) => {
    const { id } = data;
    const updatedData = pickBy<number>(data, (v, k) => k !== "id");
    const keysArr = Object.keys(updatedData) as Array<keyof AllComponentProps>;
    const valuesArr = Object.values(updatedData).map((v) => v + "px");
    updateComponent({ key: keysArr, value: valuesArr, id });
  };

  return hidden ? null : !active ? (
    <div
      ref={draggableRef}
      id="basic-element"
      onMouseDown={handleMouseDownX}
      onClick={(e) => {
        e.stopPropagation();
        setActive(id);
        if (props.url) {
          window.open(props.url);
        }
      }}
      style={{
        cursor: "grab",
        position: "absolute",
        ...props,
      }}
    >
      {type === "text" && props.text}
    </div>
  ) : (
    <div
      className="draggable-item"
      id="basic-element"
      ref={resizeBoxRef}
    >
      <div
        id="basic-element"
        ref={contentBoxRef}
        onClick={(e) => {
          e.stopPropagation();
          setActive(id);
          if (props.url) {
            window.open(props.url);
          }
        }}
        style={{
          ...props,
          width: "100%",
          height: "100%",
        }}
      >
        {type === "text" && props.text}
      </div>
      <button
        className="resize-handle top-left"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => handleMouseDown("top-left", e)}
      />
      <button
        className="resize-handle top-right"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => handleMouseDown("top-right", e)}
      />
      <button
        className="resize-handle bottom-left"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => handleMouseDown("bottom-left", e)}
      />
      <button
        className="resize-handle bottom-right"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => handleMouseDown("bottom-right", e)}
      />
    </div>
  );
};

export default EditorWrapper;
