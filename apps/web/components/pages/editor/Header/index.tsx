"use client";

import BaseLogo from "@/components/base/BaseLogo";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/stores/editor";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import EditorFeature from "./EditorFeature";
import EditorName from "./EditorName";

const EditorHeader = () => {
  const { isDirty } = useEditorStore();
  const [showSaveReminder, setShowSaveReminder] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // 添加离开页面提示
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "您有未保存的更改，确定要离开吗？";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  useEffect(() => {
    setShowSaveReminder(isDirty);
  }, [isDirty]);

  if (!mounted) return null;

  return (
    <header className="relative max-h-[15vh] backdrop-blur-[10px] transition-colors w-full h-16 flex justify-between items-center dark:bg-[#001529] shadow-black/10 dark:shadow-slate-100/20 bg-white px-8 shadow">
      <BaseLogo
        size="small"
        title="logo"
      />
      <EditorName />
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
        <EditorFeature />
      </div>

      {showSaveReminder && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-yellow-100 dark:bg-yellow-900 px-4 py-1 rounded-t text-sm text-yellow-800 dark:text-yellow-200">
          有未保存的更改
        </div>
      )}
    </header>
  );
};

export default EditorHeader;
