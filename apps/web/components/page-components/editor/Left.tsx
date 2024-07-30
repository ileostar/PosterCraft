"use client";

import Tab from "@/components/base/Tab";
import TextList from "./Left/TextList";
import ImgList from "./Left/ImgList";
import GraphList from "./Left/GraphList";
 
function Left(props: any) {

  const tabs = [
    { id: 0, label: '文本', content:  <TextList /> },
    { id: 1, label: '图片', content: <ImgList /> },
    { id: 2, label: '形状', content: <GraphList />},
  ];


  return (
    <div className="bg-[#ffffff] w-1/5 mt-3 mb-3">
      <Tab tabs={tabs} />
    </div>
  );
}

export default Left;
