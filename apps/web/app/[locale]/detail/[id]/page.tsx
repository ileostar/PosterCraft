import BaseLayout from "@/components/layouts/BaseLayout";
import Image from "next/image";

interface DetailProps {
  params: {
    id: string;
  };
}

// TODO 海报详情信息更换
const deatilInfo = {
  title: "海报标题",
  author: "作者",
  date: "2022-01-01",
  pu: ["标签1", "标签2"],
};

const Detail: React.FC<DetailProps> = ({ params }) => {
  return (
    <BaseLayout>
      <div className="h-[100vh] px-5 pt-5 flex gap-5">
        <div className="bg-gray-500/20 flex-1 flex justify-center items-center rounded-2xl">
          <span className="text-5xl font-bold text-gray-300/50">海报区域</span>
        </div>
        <div className=" flex-1">
          <span>当前页面ID： {params.id}</span>
          <span>当前页面标题</span>
          <div className="relative overflow-visible">
            <Image
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              className="rounded-full w-10 h-10 group-hover:scale-105 transition-transform duration-300"
              alt={"avatar"}
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Detail;
