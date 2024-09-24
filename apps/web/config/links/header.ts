import { useTranslations } from "next-intl";

// 然后在组件内部进行翻译
export const HeaderMenus = () => {
  const t = useTranslations();

  return [
    {
      href: "/",
      label: t("home"),
    },
    {
      href: "/templates",
      label: t("templates"),
    },
    {
      href: "/works",
      label: t("works"),
    },
    {
      href: "/about",
      label: t("about"),
    },
  ];
};
