"use client";

import { toast } from "@/components/ui/use-toast";
import { updateWork } from "@/http/work";
import GlobalDrawer from "@/layouts/common/GlobalDrawer";
import { cn } from "@/lib/utils";
import { useElementStore } from "@/stores/element";
import { useWorkStore } from "@/stores/work";

import PreviewDialog from "./PreviewDialog";
import PublishDialog from "./PublishDialog";

interface EditorFeatureProps {
  className?: string;
}

const EditorFeature: React.FC<EditorFeatureProps> = ({ className }) => {
  const elementStore = useElementStore();
  const { currentWorkId, currentWorkTitle } = useWorkStore();
  const saveWork = async () => {
    try {
      console.log(currentWorkTitle);
      await updateWork(currentWorkId!, {
        title: currentWorkTitle || "",
        content: {
          components: elementStore.Elements,
        },
      });
      toast({
        title: "保存成功",
        description: "作品已保存",
        variant: "success",
        duration: 1000,
      });
    } catch (error) {
      console.log("保存失败，失败原因：", error);
    }
  };

  return (
    <nav className={cn("h-full flex items-center justify-between gap-5", className)}>
      <div className="flex items-center gap-2">
        <div
          className="btn-circle h-7 w-7 bg-white/30 flex justify-center items-center cursor-pointer hover:bg-white/25 transition-color during-300"
          onClick={saveWork}
        >
          <i className=" icon-[carbon--save] hover:scale-105 transition-all duration-300" />
        </div>
        <PreviewDialog>
          <button className="cursor-pointer bg-[#3D7FFF] relative items-center justify-center flex gap-2 rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#3D7FFF]/90 text-white h-7 px-3">
            <span className="icon-[carbon--save]"></span>
            预览和设置
          </button>
        </PreviewDialog>

        <PublishDialog>
          <button className="cursor-pointer bg-[#3D7FFF] relative items-center justify-center flex gap-2 rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#3D7FFF]/90 text-white h-7 px-3">
            <span className="icon-[carbon--ibm-elo-publishing]"></span>
            发布
          </button>
        </PublishDialog>
      </div>
      <GlobalDrawer className="w-8 h-8" />
    </nav>
  );
};

export default EditorFeature;
