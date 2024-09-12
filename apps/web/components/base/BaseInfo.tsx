import { cn } from "@/lib/utils";

interface BaseInfoProps {
  icon?: string;
  title: string;
  content: string;
}

const BaseInfo: React.FC<BaseInfoProps> = ({ icon, title, content }) => {
  return (
    <div className="flex items-center justify-center backdrop-blur-3xl  dark:backdrop-blur-xl bg-gray-300/30 dark:bg-gray-300/20 rounded-xl h-full p-5">
      {icon && (
        <span className={cn("text-rose-400 dark:text-[#FF33DE] h-16 w-16 rounded-full", icon)} />
      )}
      <div className="flex flex-col justify-center p-5">
        <h3 className="text-xl font-bold">{title}</h3>
        <span className="text-sm text-gray-500 dark:text-white/60">{content}</span>
      </div>
    </div>
  );
};

export default BaseInfo;
