import { UseElementStore } from "@/stores/element";
import { useEffect } from "react";

export default function useHotKey() {
  const {
    currentElement,
    deleteElement,
    setCurrentElement,
    setCopyElement: copyComponent,
    setPastedElement: pasteComponent,
    setMoveElement,
    undo,
    redo,
  } = UseElementStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 复制
      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        e.preventDefault();
        if (currentElement) {
          copyComponent(currentElement);
        }
      }
      // 粘贴
      if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        e.preventDefault();
        pasteComponent();
      }
      // 删除
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        if (currentElement) {
          deleteElement(currentElement);
        }
      }
      // 取消选中
      if (e.key === "Escape") {
        e.preventDefault();
        setCurrentElement("");
      }
      // 撤销
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        undo();
      }
      // 重做
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "z") {
        e.preventDefault();
        redo();
      }
      // 移动
      if (currentElement) {
        const amount = e.shiftKey ? 10 : 1;
        switch (e.key) {
          case "ArrowUp":
            e.preventDefault();
            setMoveElement(currentElement, "Up", amount);
            break;
          case "ArrowDown":
            e.preventDefault();
            setMoveElement(currentElement, "Down", amount);
            break;
          case "ArrowLeft":
            e.preventDefault();
            setMoveElement(currentElement, "Left", amount);
            break;
          case "ArrowRight":
            e.preventDefault();
            setMoveElement(currentElement, "Right", amount);
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    currentElement,
    deleteElement,
    setMoveElement,
    redo,
    copyComponent,
    setCurrentElement,
    pasteComponent,
    undo,
  ]);
}
