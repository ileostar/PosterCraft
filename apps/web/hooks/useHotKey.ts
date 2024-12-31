import { ComponentData, useEditorStore } from "@/stores/editor";
import hotkeys from "hotkeys-js";
import { useEffect } from "react";

export default function useHotKey() {
  const {
    currentElement,
    getCurrentElement,
    copyComponent,
    pasteComponent,
    deleteComponent,
    setActive,
    updateComponent,
  } = useEditorStore();

  useEffect(() => {
    // 复制
    hotkeys("ctrl+c, command+c", (e) => {
      e.preventDefault();
      if (currentElement) {
        copyComponent(currentElement);
      }
    });

    // 粘贴
    hotkeys("ctrl+v, command+v", (e) => {
      e.preventDefault();
      pasteComponent();
    });

    // 删除
    hotkeys("del, backspace", (e) => {
      e.preventDefault();
      if (currentElement) {
        deleteComponent(currentElement);
      }
    });

    // 取消选中
    hotkeys("esc", (e) => {
      e.preventDefault();
      setActive("");
    });

    // 清理函数
    return () => {
      hotkeys.unbind("ctrl+c, command+c");
      hotkeys.unbind("ctrl+v, command+v");
      hotkeys.unbind("del, backspace");
      hotkeys.unbind("esc");
    };
  }, [currentElement, copyComponent, pasteComponent, deleteComponent, setActive, updateComponent]);
}
