import GlobalDrawer from "@/components/layouts/common/GlobalDrawer";
import { cn } from "@/lib/utils";

import PreviewDialog from "./PreviewDialog";
import PublishDialog from "./PublishDialog";
import SaveDialog from "./SaveDialog";

interface EditorFeatureProps {
  className?: string;
}

const EditorFeature: React.FC<EditorFeatureProps> = ({ className }) => {
  return (
    <nav className={cn("h-full flex items-center justify-between gap-5", className)}>
      <div className="flex items-center gap-2">
        <PreviewDialog>
          <button className="cursor-pointer bg-[#3D7FFF] relative items-center justify-center flex gap-2 rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#3D7FFF]/90 text-white h-7 px-3">
            <span className="icon-[carbon--save]"></span>
            预览和设置
          </button>
        </PreviewDialog>
        <SaveDialog>
          <button className="cursor-pointer bg-[#3D7FFF] relative items-center justify-center flex gap-2 rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#3D7FFF]/90 text-white h-7 px-3">
            <span className="icon-[carbon--save]"></span>
            保存
          </button>
        </SaveDialog>

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
