import { UseElementStore } from "@/store/element";
import React, { useEffect, useRef, useState } from "react";

//现在的位置=鼠标移动距离+原来的位置

function DraggableComponent(props: { item: any }) {

    const { setCurrentElement, setIsElement, currentElement,updateElement,setCurrentPosition } = UseElementStore(); 
    
    const { item } = props;

    let top=item.props.top?parseInt(item.props.top.replace(/(px|rem)/g, ''), 10):0;
    let left=item.props.left?parseInt(item.props.left.replace(/(px|rem)/g, ''), 10):0;
   
  const [position, setPosition] = useState({ x:left, y: top });
  const draggableRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setCurrentElement(item.id);
    
    // 阻止默认行为（如选择文本）
    e.preventDefault();
    // 记录初始鼠标位置
    const initialMouseX = e.clientX ;
    const initialMouseY = e.clientY ;

    // 监听mousemove和mouseup事件
    const handleMouseMove = (moveEvent: MouseEvent) => {
      // 更新元素位置
      setPosition({
        x: moveEvent.clientX - initialMouseX+position.x,
        y: moveEvent.clientY - initialMouseY+position.y,
      });

      if(draggableRef.current){
        draggableRef.current.style.left = `${moveEvent.clientX - initialMouseX+position.x}px`;
        draggableRef.current.style.top = `${moveEvent.clientY - initialMouseY+position.y}px`;
     }
    };

    const handleMouseUp = () => {
      // 移除mousemove和mouseup事件监听器
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // 绑定事件监听器到document，以便在移动时也能触发
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };


  useEffect(() => {
    const style = {
        left: position.x + "px",
        top: position.y + "px",
      };
    updateElement(item.id,style)
    setCurrentPosition(position.x,position.y);
  }, [currentElement, position, setCurrentPosition, updateElement, item.id, setCurrentElement]);

  return (
    <div
      ref={draggableRef}
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        e.stopPropagation();
        setCurrentElement(item.id);
        setIsElement(true);
        if (item.url) {
          window.open(item.url);
        }
      }}
      style={{
        // left: `${position.x}px`,
        // top: `${position.y}px`,
        cursor: "grab",
        position: "absolute",
        ...item.props,
      }}
    >
      {item.type === "text" && item.text}
    </div>
 
  );
}

export default DraggableComponent;
