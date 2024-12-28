"use client";

import { useWorkStore } from "@/stores/work";
import { useEffect, useState } from "react";

const EditorName = () => {
  const { currentWorkId } = useWorkStore();
  const [workName, setWorkName] = useState("未命名作品");

  useEffect(() => {
    // 这里可以添加获取作品名称的逻辑
    if (currentWorkId) {
      // 获取作品信息并设置名称
    }
  }, [currentWorkId]);

  return (
    <div className="flex items-center gap-2">
      <h1 className="text-xl font-bold">{workName}</h1>
      <span className="text-sm text-gray-500">
        {currentWorkId ? `ID: ${currentWorkId}` : "未保存"}
      </span>
    </div>
  );
};

export default EditorName;
