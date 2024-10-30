import { useTranslations } from "next-intl";

export const FooterNavLinks = () => {
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
  ];
};

export const FooterSocialLinks = [
  { href: "#", icon: "Facebook", srOnlyText: "Facebook" },
  { href: "#", icon: "Instagram", srOnlyText: "Instagram" },
  { href: "https://www.twitter.com/030LeoStar", icon: "X", srOnlyText: "X" },
  { href: "https://github.com/ileostar/PosterCraft", icon: "GitHub", srOnlyText: "GitHub" },
  { href: "#", icon: "YouTube", srOnlyText: "YouTube" },
];
