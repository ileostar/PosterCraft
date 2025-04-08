"use client";

import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useWorkStore } from "@/stores/work";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface EditorNameProps {
  name?: string;
  className?: string;
}

const EditorName: React.FC<EditorNameProps> = ({ name, className }) => {
  const t = useTranslations("work");
  const { setWorkTitle } = useWorkStore();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(name || "");

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 处理失去焦点时保存
  const handleBlur = () => {
    setIsEditing(false);
    // 校验标题长度
    if (inputValue.trim().length === 0) {
      toast({
        title: "标题不能为空",
        description: "请输入作品标题",
        variant: "destructive",
        duration: 1000,
      });
      return;
    }
    if (inputValue.length > 50) {
      toast({
        title: "标题过长",
        description: "标题不能超过50个字符",
        variant: "destructive",
        duration: 1000,
      });
      return;
    }

    // 校验通过后保存标题
    setWorkTitle(inputValue);
    toast({
      title: "保存成功",
      description: "作品标题已保存",
      variant: "success",
      duration: 1000,
    });
  };

  return (
    <div
      className={cn("text-xl font-bold", className)}
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          autoFocus
          className="min-w-[200px] text-center outline-none focus:ring-0 focus-visible:ring-0 border-none"
        />
      ) : (
        <span className="text-sm">{inputValue || t("unnamed-title")}</span>
      )}
    </div>
  );
};

export default EditorName;
