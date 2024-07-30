"use client";

import Tab from "@/components/base/Tab";
import SetProps from "@/components/page-components/editor/Right/SetProps"
import SetLayer from "@/components/page-components/editor/Right/SetLayer"
import SetPage from "@/components/page-components/editor/Right/SetPage"

const tabs = [
  { id: 0, label: '属性设置', content: <SetProps /> },
  { id: 1, label: '图层设置', content:  <SetLayer /> },
  { id: 2, label: '页面设置', content: <SetPage />},
];

function Right(props: any) {
  return (
  <div className="bg-[#ffffff] w-1/5 h-full pt-3 pb-3 flex">
     <Tab tabs={tabs} />
  </div>
  );
}

export default Right;
