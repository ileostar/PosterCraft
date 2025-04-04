"use client";

import React, { useState } from "react";

interface Tab {
  id: number;
  label: string;
  content: string | JSX.Element | null; // 内容可以是字符串或JSX元素
}

interface TabsProps {
  readonly tabs: ReadonlyArray<Tab>; // 定义接收的props类型
}

function Tab({ tabs }: TabsProps) {
  // 跟踪当前活动的标签页索引
  const [activeTabIndex, setActiveTabIndex] = useState(0); // 假设第一个标签页是活动的

  // 处理点击事件以更新活动的标签页
  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  return (
    <div className="flex flex-col flex-1">
      <div
        role="tablist"
        className="tabs tabs-bordered"
      >
        {tabs.map((tab: any) => (
          <button
            key={tab.id}
            role="tab"
            className={`tab pt-2 pb-8 ${tab.id === activeTabIndex ? "tab-active" : ""}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex-1">
        {/* 根据当前活动的标签页索引渲染对应的内容 */}
        {tabs[activeTabIndex]?.content && (
          <div className="h-full">{tabs[activeTabIndex].content}</div>
        )}
      </div>
    </div>
  );
}

export default Tab;
