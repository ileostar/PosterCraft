"use client";

import { pick } from "lodash-es";
import React, { useRef } from "react";

type ResizeDirection = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface OriginalPositions {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface EditorWrapperProps {
  id: string;
  active?: boolean;
  hidden?: boolean;
  props: { [key: string]: any };
  onSetActive: (id: string) => void;
  onUpdatePosition: (position: {
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    id: string;
  }) => void;
}

const EditorWrapper: React.FC<EditorWrapperProps> = ({
  id,
  active = false,
  hidden = false,
  props,
  onSetActive,
  onUpdatePosition,
  children,
}) => {
  const editWrapper = useRef<HTMLDivElement | null>(null);
  const gap = { x: 0, y: 0 };
  let isMoving = false;

  const styles = pick(props, ["position", "top", "left", "width", "height"]);

  const handleClick = () => {
    onSetActive(id);
  };

  const calculateMovePosition = (e: MouseEvent) => {
    const container = document.getElementById("canvas-area") as HTMLElement;
    const left = e.clientX - gap.x - container.offsetLeft;
    const top = e.clientY - gap.y - container.offsetTop + container.scrollTop;
    return { left, top };
  };

  const startMove = (e: React.MouseEvent) => {
    const currentElement = editWrapper.current;
    if (currentElement) {
      const { left, top } = currentElement.getBoundingClientRect();
      gap.x = e.clientX - left;
      gap.y = e.clientY - top;
    }

    const handleMove = (e: MouseEvent) => {
      const { left, top } = calculateMovePosition(e);
      isMoving = true;
      if (currentElement) {
        currentElement.style.top = `${top}px`;
        currentElement.style.left = `${left}px`;
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      document.removeEventListener("mousemove", handleMove);
      if (isMoving) {
        const { left, top } = calculateMovePosition(e);
        onUpdatePosition({ left, top, id });
        isMoving = false;
      }
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className={`edit-wrapper ${active ? "active" : ""} ${hidden ? "hidden" : ""}`}
      ref={editWrapper}
      style={styles}
      data-component-id={id}
      onMouseDown={startMove}
      onClick={handleClick}
    >
      {children}
      <div className="resizers">
        <div
          className="resizer top-left"
          onMouseDown={(e) => e.stopPropagation()}
        ></div>
        <div
          className="resizer top-right"
          onMouseDown={(e) => e.stopPropagation()}
        ></div>
        <div
          className="resizer bottom-left"
          onMouseDown={(e) => e.stopPropagation()}
        ></div>
        <div
          className="resizer bottom-right"
          onMouseDown={(e) => e.stopPropagation()}
        ></div>
      </div>
    </div>
  );
};

export default EditorWrapper;
