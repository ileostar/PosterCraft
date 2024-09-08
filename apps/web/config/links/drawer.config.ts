import { GlobalEnvConfig } from "../env";

export const DrawerMenuItems = [
  {
    href: "/settings",
    iconClass: "icon-[carbon--settings]",
    text: "设置",
  },
  {
    href: "/user",
    iconClass: "icon-[carbon--user-avatar]",
    text: "个人中心",
  },
  {
    href: GlobalEnvConfig.DEV_DOCS,
    iconClass: "icon-[carbon--document-multiple-01]",
    text: "开发文档",
  },
  {
    href: "https://github.com/ileostar/PosterCraft",
    iconClass: "icon-[carbon--logo-github]",
    text: "项目地址",
  },
];
