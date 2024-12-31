"use client";

import SetLayer from "@/components/pages/editor/Right/setLayer";
import SetPage from "@/components/pages/editor/Right/SetPage";
import SetProps from "@/components/pages/editor/Right/setProps";
import Tab from "@/components/shared/Tab";
import { useEditorStore } from "@/stores/editor";

/**
 * 右侧属性面板
 */
function Right() {
  const { getCurrentElement } = useEditorStore();
  const currentElement = getCurrentElement();

  const tabs = [
    {
      id: 0,
      label: "属性设置",
      content: currentElement?.id ? <SetProps /> : null,
    },
    { id: 1, label: "图层设置", content: <SetLayer /> },
    { id: 2, label: "页面设置", content: <SetPage /> },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 w-1/5 h-full flex border-l border-gray-200 dark:border-gray-700">
      <Tab tabs={tabs} />
    </div>
  );
}

export default Right;
