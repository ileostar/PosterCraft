import { useElementStore } from "@/stores/element";
import { useEffect, useRef } from "react";

export interface ActionItem {
  action: (elementId?: string) => void;
  text: string;
  hotkey: string;
}
function ContextMenu({ item }: Readonly<{ item: ActionItem[] }>) {
  const { currentElement } = useElementStore();

  const menuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: MouseEvent) => {
    const targetElement = e.target as HTMLElement;
    console.log(targetElement.id);
    if (targetElement.id !== "basic-element") {
      return;
    }
    e.preventDefault();
    const domElement = menuRef.current;
    if (domElement) {
      domElement.style.display = "block";
      domElement.style.top = e.pageY + "px";
      domElement.style.left = e.pageX + "px";
    }
  };

  const handleClick = () => {
    const domElement = menuRef.current;
    if (domElement) {
      domElement.style.display = "none";
    }
  };

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", handleClick);

    return () => {
      // 清理函数
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      className="bg-white rounded-lg shadow-md p-2 fixed hidden "
      ref={menuRef}
      style={{ zIndex: 100000 }}
    >
      <ul className="list-none">
        {item.map((items, index) => {
          return (
            <li
              key={items.text}
              onClick={() => items.action(currentElement)}
              className={`px-4 py-2 bg-white hover:bg-gray-100 rounded-md cursor-pointer flex flex-row justify-between gap-10   ${index !== item.length - 1 ? "border-b border-gray-300" : ""}`}
            >
              <div className="text-gray-700">{items.text}</div>
              <div className="ml-auto text-gray-500 font-size-sm">{items.hotkey}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ContextMenu;
