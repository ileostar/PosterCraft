"use client";

import Tab from "@/components/base/BaseTab";
import SetLayer from "@/components/page/editor/Right/SetLayer";
import SetPage from "@/components/page/editor/Right/SetPage";
import SetProps from "@/components/page/editor/Right/SetProps";
import { UseElementStore } from "@/store/element";

function Right(props: any) {
  const { isElement, isCurrentLocked } = UseElementStore();

  const tabs = [
    { id: 0, label: "属性设置", content: isElement && !isCurrentLocked ? <SetProps /> : null },
    { id: 1, label: "图层设置", content: <SetLayer /> },
    { id: 2, label: "页面设置", content: <SetPage /> },
  ];

  return (
    <div className="bg-[#ffffff] w-1/5 h-full pt-3 pb-3 flex">
      <Tab tabs={tabs} />
    </div>
  );
}

export default Right;
