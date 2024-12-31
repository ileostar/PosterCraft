"use client";

import { cn } from "@/lib/utils";
import { useEditorStore } from "@/stores/editor";
import {
  DragOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import InlineEdit from "./InlineEdit";

interface LayerItem {
  id: string;
  isHidden?: boolean;
  isLocked?: boolean;
  layerName?: string;
}

const ItemType = {
  LAYER: "layer",
};

const Layer = ({
  item,
  index,
  moveLayer,
}: {
  item: LayerItem;
  index: number;
  moveLayer: (dragIndex: number, hoverIndex: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { updateComponent, setActive, currentElement } = useEditorStore();

  const [, drop] = useDrop({
    accept: ItemType.LAYER,
    hover(draggedItem: { index: number }) {
      if (!ref.current) return;
      if (draggedItem.index !== index) {
        moveLayer(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.LAYER,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleLayerUpdate = (id: string, key: "isHidden" | "isLocked", value: boolean) => {
    updateComponent({
      key,
      value,
      id,
      isRoot: true,
    });
  };

  return (
    <div
      ref={ref}
      className={cn(
        "flex justify-between items-center p-2 rounded-md transition-colors duration-200",
        "hover:bg-gray-100 dark:hover:bg-gray-700",
        "border-b border-gray-200 dark:border-gray-600",
        item.id === currentElement && "bg-gray-100 dark:bg-gray-700",
      )}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={() => setActive(item.id)}
    >
      <div className="flex items-center gap-2">
        <button
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            handleLayerUpdate(item.id, "isHidden", !item.isHidden);
          }}
        >
          {item.isHidden ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        </button>
        <button
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            handleLayerUpdate(item.id, "isLocked", !item.isLocked);
          }}
        >
          {item.isLocked ? <LockOutlined /> : <UnlockOutlined />}
        </button>
      </div>
      <div className="flex-1 mx-2">
        <InlineEdit
          value={item.layerName}
          id={item.id}
        />
      </div>
      <button className="handle p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors cursor-move">
        <DragOutlined />
      </button>
    </div>
  );
};

function SetLayer() {
  const { components, setComponents } = useEditorStore();
  const [containerStyle, setContainerStyle] = useState({
    maxHeight: "0px",
    overflowY: "auto" as const,
  });

  const moveLayer = (dragIndex: number, hoverIndex: number) => {
    const updatedComponents = [...components];
    const actualDragIndex = components.length - 1 - dragIndex;
    const actualHoverIndex = components.length - 1 - hoverIndex;

    const [removed] = updatedComponents.splice(actualDragIndex, 1);
    updatedComponents.splice(actualHoverIndex, 0, removed);
    setComponents(updatedComponents);
  };

  useEffect(() => {
    const updateContainerHeight = () => {
      const parentHeight = document.getElementById("layer-container")?.offsetHeight || 0;
      setContainerStyle({
        maxHeight: `${parentHeight}px`,
        overflowY: "auto",
      });
    };
    updateContainerHeight();
    window.addEventListener("resize", updateContainerHeight);
    return () => window.removeEventListener("resize", updateContainerHeight);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        id="layer-container"
        className="h-full space-y-1 p-2"
      >
        {[...components].reverse().map((item, index) => (
          <Layer
            key={item.id}
            item={item}
            index={index}
            moveLayer={moveLayer}
          />
        ))}
      </div>
    </DndProvider>
  );
}

export default SetLayer;
