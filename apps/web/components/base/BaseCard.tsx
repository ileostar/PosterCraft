import Image from "next/image";

interface BaseCardProps {
  title?: string;
  description?: string;
  imgUrl: string;
  onClick?: () => void;
}

const BaseCard: React.FC<BaseCardProps> = ({
  title = "暂无标题",
  imgUrl,
  description = "暂无描述",
  onClick,
}) => {
  return (
    <div className="relative col-span-1 flex items-end w-full h-[315px] rounded-2xl 2xl:rounded-3xl bg-center bg-cover bg-no-repeat hover:scale-95 overflow-hidden transition-transform duration-300">
      <Image
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={imgUrl}
        alt={title}
        height={315}
        width={400}
      />
      <div className="block flex-1 bg-white h-[95px] px-4 glass">
        <h4 className="text-xs font-bold text-white dark:text-[#161616] py-4 truncate max-w-[90%] 2xl:max-w-none">
          {title}
        </h4>
        <div className="flex items-center justify-between font-bold text-[0.625rem]">
          <div className="flex flex-col">
            <span className="text-white dark:text-[#646464]">{description}</span>
          </div>
          <button
            onClick={onClick}
            className="text-white dark:text-[#161616] hover:bg-rose-500 dark:hover:bg-[#E730CA] dark:hover:text-white border rounded-full dark:border-[#161616] border-solid hover:border-rose-500 dark:hover:border-[#E730CA] w-16 h-6 transition-colors"
          >
            查看详情
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaseCard;
