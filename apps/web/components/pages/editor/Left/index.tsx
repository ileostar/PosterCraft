"use client";

import Tab from "@/components/shared/Tab";

import GraphList from "./GraphList";
import ImgList from "./ImgList";
import TextList from "./TextList";

function Left() {
  const tabs = [
    { id: 0, label: "文本", content: <TextList /> },
    { id: 1, label: "图片", content: <ImgList /> },
    { id: 2, label: "形状", content: <GraphList /> },
  ];

  return (
    <div className="bg-white w-1/5 mt-3 mb-3 overflow-auto">
      <Tab tabs={tabs} />
    </div>
  );
}

export default Left;
