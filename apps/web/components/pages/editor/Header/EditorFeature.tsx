import BaseButton from "@/components/base/BaseButton";
import GlobalDrawer from "@/components/layouts/common/GlobalDrawer";
import { cn } from "@/lib/utils";

interface EditorFeatureProps {
  className?: string;
}

const EditorFeature: React.FC<EditorFeatureProps> = ({ className }) => {
  return (
    <nav className={cn("h-full flex items-center justify-between gap-5", className)}>
      <div className="flex items-center gap-2">
        <button className="cursor-pointer bg-[#3D7FFF] relative items-center justify-center flex gap-2 rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#3D7FFF]/90 text-white h-7 px-3">
          <svg
            className="lucide lucide-rocket text-cyan-500 dark:text-cyan-400"
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2"
            stroke="#fff"
            fill="none"
            viewBox="0 0 24 24"
            height="18"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
          </svg>
          发布
        </button>
      </div>
      <GlobalDrawer className="w-8 h-8" />
    </nav>
  );
};

export default EditorFeature;
