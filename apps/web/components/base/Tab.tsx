 // Tabs.tsx
import React, { useState } from 'react';

// const tabs: Tab[] = [
//     { id: 0, label: '文本', content: '这是文本标签页的内容。' },
//     { id: 1, label: '图片', content: <img src="path/to/image.jpg" alt="示例图片" /> },
//     { id: 2, label: '形状', content: '这是形状标签页的内容，可以展示不同的形状。' },
//   ];

interface Tab {
    id: number;
    label: string;
    content: string | JSX.Element; // 内容可以是字符串或JSX元素
  }

interface TabsProps {
  tabs: Tab[]; // 定义接收的props类型
}

function Tabs({ tabs }: TabsProps) {
  // 跟踪当前活动的标签页索引
  const [activeTabIndex, setActiveTabIndex] = useState(0); // 假设第一个标签页是活动的

  // 处理点击事件以更新活动的标签页
  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  return (
    <div className='flex flex-col flex-1'>
      <div role="tablist" className="tabs tabs-bordered">
        {tabs.map((tab) => (
          <a
            key={tab.id}
            role="tab"
            className={`tab ${tab.id === activeTabIndex ? 'tab-active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </a>
        ))}
      </div>
      <div className="flex-1">
        {/* 根据当前活动的标签页索引渲染对应的内容 */}
        {tabs[activeTabIndex]?.content && (
          <div className="h-full">
            {tabs[activeTabIndex].content}
          </div>
        )} 
      </div>
    </div>
  );
}

export default Tabs;