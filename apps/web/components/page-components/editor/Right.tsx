"use client";

import Tab from "@/components/base/Tab";

const tabs = [
  { id: 0, label: '属性设置', content: '这是文本标签页的内容。' },
  { id: 1, label: '图层设置', content:  '这是文本标签页的内容。' },
  { id: 2, label: '页面设置', content: '这是形状标签页的内容，可以展示不同的形状。' },
];

function Right(props: any) {
  return (
  <div className="bg-[#ffffff] w-1/5 mt-3 mb-3">
     <Tab tabs={tabs} />
  </div>
  );
}

export default Right;
