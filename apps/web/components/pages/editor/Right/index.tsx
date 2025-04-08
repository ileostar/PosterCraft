"use client";

import SetLayer from "@/components/pages/editor/Right/setLayer";
import SetPage from "@/components/pages/editor/Right/SetPage";
import SetProps from "@/components/pages/editor/Right/setProps";
import Tab from "@/components/shared/Tab";
import { useElementStore } from "@/stores/element";

function Right(props: any) {
  const { isElement, isCurrentLocked } = useElementStore();

  const tabs = [
    { id: 0, label: "属性设置", content: isElement && !isCurrentLocked ? <SetProps /> : null },
    { id: 1, label: "图层设置", content: <SetLayer /> },
    { id: 2, label: "页面设置", content: <SetPage /> },
  ];

  return (
    <div className="bg-[#ffffff] w-1/5 h-full flex">
      <Tab tabs={tabs} />
    </div>
  );
}

export default Right;
