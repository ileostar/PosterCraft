import BaseInfo from "@/components/base/BaseInfo";

interface IntroduceProps {}

const infos = [
  {
    title: "直观的界面",
    content: "用户友好的拖放界面,让您轻松创建精美海报",
    icon: "icon-[carbon--page-break]",
  },
  {
    title: "丰富的模板",
    content: "数百种精心设计的模板,满足各种场景需求",
    icon: "icon-[carbon--template]",
  },
  {
    title: "一键分享",
    content: "轻松将您的作品分享到社交媒体或导出高质量图片",
    icon: "icon-[carbon--share]",
  },
];

const Introduce: React.FC<IntroduceProps> = () => {
  return (
    <section className="w-full h-52 sm:p-5 mt-10 grid grid-cols-2 items-center gap-x-4 gap-y-6 sm:gap-x-5 sm:gap-y-7 lg:mx-0 lg:grid-cols-3">
      {infos.map((info, index) => (
        <BaseInfo
          title={info.title}
          content={info.content}
          icon={info.icon}
          key={index}
        />
      ))}
    </section>
  );
};

export default Introduce;
