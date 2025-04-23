import BaseInfo from "@/components/BaseInfo";
import { useTranslations } from "next-intl";

interface IntroduceProps {}

const Introduce: React.FC<IntroduceProps> = () => {
  const t = useTranslations();

  const infos = [
    {
      title: t("intuitive-page"),
      content: t("intuitive-page-desc"),
      icon: "icon-[carbon--page-break]",
    },
    {
      title: t("rich-templates"),
      content: t("rich-templates-desc"),
      icon: "icon-[carbon--template]",
    },
    {
      title: t("high-compatibility"),
      content: t("high-compatibility-desc"),
      icon: "icon-[carbon--accessibility]",
    },
    {
      title: t("one-click-sharing"),
      content: t("one-click-sharing-desc"),
      icon: "icon-[carbon--share]",
    },
  ];

  return (
    <section className="w-full sm:p-5 mt-10 grid grid-cols-2 items-center gap-x-4 gap-y-6 sm:gap-x-5 sm:gap-y-7 lg:mx-0 lg:grid-cols-4">
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
