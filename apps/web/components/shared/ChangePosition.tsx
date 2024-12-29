import { useEditorStore } from "@/stores/editor";
import { UseElementStore } from "@/stores/element";
import React, { useRef } from "react";

//现在的位置=鼠标移动距离+原来的位置

function ChangePosition({
  item,
}: Readonly<{
  item: any;
}>) {
  console.log("item", item);

  const { setActive, updateComponent } = useEditorStore();

  let top = item.props.top ? parseInt(item.props.top.replace(/(px|rem)/g, ""), 10) : 0;
  let left = item.props.left ? parseInt(item.props.left.replace(/(px|rem)/g, ""), 10) : 0;

  const position = { x: left, y: top };
  const draggableRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
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

      const style = {
        left: position.x + "px",
        top: position.y + "px",
      };
      updateComponent({
        key: "top",
        value: style.top,
        id: item.id,
        isRoot: true,
      });
      updateComponent({
        key: "left",
        value: style.left,
        id: item.id,
        isRoot: true,
      });

      // 移除mousemove和mouseup事件监听器
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // 绑定事件监听器到document，以便在移动时也能触发
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={draggableRef}
      id="basic-element"
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        e.stopPropagation();
        setActive(item.id);
        if (item.url) {
          window.open(item.url);
        }
      }}
      style={{
        cursor: "grab",
        position: "absolute",
        ...item.props,
      }}
    >
      {item.name === "text" && item.props.text}
    </div>
  );
}

export default ChangePosition;
