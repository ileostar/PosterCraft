"use client";

import MenuItem from "@/components/shared/MenuItem";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { GlobalEnvConfig } from "@/config";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface GlobalDrawerProps {
  className?: string;
}

// TODO 替换接口来的信息或者从store获取
const userInfo = {
  avatar: "",
  username: "LeoStar",
  nickname: "LeoStar",
  email: "",
  phone: "",
  address: "",
};

const DrawerMenuItems = [
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

const GlobalDrawer: React.FC<GlobalDrawerProps> = ({ className }) => {
  // TODO 退出登陆
  const logout = async () => {};

  return (
    <Drawer direction="right">
      <DrawerTrigger className="overflow-visible">
        <div className="relative hidden min-[845px]:flex bg-transparent rounded-lg font-semibold transition-all duration-700 will-change-transform">
          <div className="cursor-pointer group">
            <div className="relative overflow-visible">
              <Image
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                className={cn(
                  "rounded-full w-10 h-10 group-hover:scale-105 transition-transform duration-300",
                  className,
                )}
                alt={"avatar"}
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-[100vh] w-[340px]  dark:bg-[#1F2937] px-6 pb-6">
        <div className="relative w-full h-full">
          <div className="flex gap-3 h-14">
            <Image
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              className="rounded-full w-16 h-16  group-hover:scale-105 transition-transform duration-300"
              alt={"avatar"}
              width={100}
              height={100}
            />
            <div className="h-full flex flex-col justify-center gap-1">
              <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300/80">
                {userInfo.nickname}
              </h3>
              <p className="text-sm text-gray-600/80 dark:text-gray-400/70">{userInfo.username}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-2">
            {DrawerMenuItems.map((item, index) => (
              <MenuItem
                key={index}
                href={item.href}
                ClassName={String(item.iconClass)}
                text={item.text}
              />
            ))}
            <MenuItem
              ClassName="icon-[carbon--logout]"
              text="登出"
              onClick={() => logout()}
            />
            <DrawerClose className="absolute top-3 right-3 z-50">
              <span className="icon-[carbon--close] h-7 w-7"></span>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default GlobalDrawer;
