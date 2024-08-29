interface BaseCardProps {
  title?: string;
  description?: string;
  imgUrl?: string;
}

const BaseInfo: React.FC<BaseCardProps> = ({ title, imgUrl, description }) => {
  return (
    <div className="relative col-span-1 flex items-end w-full h-[315px] rounded-2xl 2xl:rounded-3xl bg-center bg-cover bg-no-repeat hover:scale-95 overflow-hidden transition-transform duration-300">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={imgUrl}
        alt={title}
      />
      <div className="block flex-1 bg-white h-[95px] px-4 glass">
        <h4 className="text-xs font-bold text-[#161616] py-4 truncate max-w-[90%] 2xl:max-w-none">
          {title || "暂无标题"}
        </h4>
        <div className="flex items-center justify-between font-bold text-[0.625rem]">
          <div className="flex flex-col">
            <span className="text-[#646464]">{description || "暂无描述"}</span>
          </div>
          <button className="text-[#161616] hover:text-[#E730CA] border rounded-full border-[#161616] border-solid hover:border-[#E730CA] w-12 h-6 transition-colors">
            查看更多
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaseInfo;
