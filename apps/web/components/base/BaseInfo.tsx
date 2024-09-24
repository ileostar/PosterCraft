import { cn } from "@/lib/utils";

interface BaseInfoProps {
  icon?: string;
  title: string;
  content: string;
}

const BaseInfo: React.FC<BaseInfoProps> = ({ icon, title, content }) => {
  return (
    <div className="flex items-center justify-center backdrop-blur-3xl hover:brightness-90 transition-all cursor-pointer group dark:bg-gradient-to-tl dark:from-gray-900/80 dark:to-gray-950/80 dark:hover:from-gray-800/80 dark:hover:to-gray-950/80 border-r-2 border-t-2 dark:border-gray-900/80 border-solid overflow-hidden relative dark:backdrop-blur-xl bg-gray-300/30 dark:bg-gray-300/10 rounded-xl h-full p-5 pb-0 card">
      {icon && <span className={cn("text-rose-400 dark:text-[#FF33DE] h-16 w-16", icon)} />}
      <div className="flex flex-col justify-center p-5 mb-5">
        <h3 className="text-xl font-bold">{title}</h3>
        <span className="text-sm text-gray-500 dark:text-white/60">{content}</span>
      </div>
      <div className="h-2 w-full bg-gradient-to-l via-yellow-500 group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-0"></div>
      <div className="h-0.5 group-hover:w-full bg-gradient-to-l  via-yellow-950 group-hover:via-yellow-500 w-[70%] m-auto rounded transition-all"></div>
    </div>
  );
};

export default BaseInfo;
