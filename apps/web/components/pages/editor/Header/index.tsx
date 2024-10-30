import BaseLogo from "@/components/base/BaseLogo";

import EditorFeature from "./EditorFeature";
import EditorName from "./EditorName";

interface EditorHeaderProps {}

const EditorHeader: React.FC<EditorHeaderProps> = () => {
  return (
    <header className="max-h-[15vh] backdrop-blur-[10px] transition-colors w-full h-16 flex justify-between items-center dark:bg-[#001529] shadow-black dark:shadow-slate-100/20 bg-white px-8 shadow">
      <BaseLogo
        size="small"
        title="logo"
      />
      <EditorName name="未命名作品" />
      <EditorFeature />
    </header>
  );
};

export default EditorHeader;
