import BaseLogo from "@/components/base/BaseLogo";

import EditorFeature from "./EditorFeature";

interface EditorHeaderProps {}

const EditorHeader: React.FC<EditorHeaderProps> = () => {
  return (
    <header className="backdrop-blur-[10px] transition-colors w-full h-12 flex justify-between items-center dark:bg-[#001529] shadow-black dark:shadow-slate-100/20 bg-white px-8 shadow">
      <BaseLogo
        size="small"
        title="logo"
      />
      <EditorFeature />
    </header>
  );
};

export default EditorHeader;
