import { availableLocaleCodes, defaultLocale, localePrefix } from "../i18n/locales.config";

export const siteConfig = {
  title: "PosterCraft",
  description: "A platform for creating and sharing posters and other designs",
  favicon: "/favicon.png",
  github: {
    repoLink: "https://github.com/ileostar/PosterCraft",
  },
  twitter: {
    username: "@030LeoStar",
    card: "summary",
    img: "/social/logo-twitter-leostar.png",
    imgAlt: "The LeoStar Logo",
    title: "summary",
  },
  locale: {
    locales: availableLocaleCodes,
    defaultLocale: defaultLocale?.code,
    localePrefix: localePrefix,
    timeZone: "Etc/UTC",
  },
};
