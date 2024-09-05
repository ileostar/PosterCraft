"use client";

import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import config from "@/config";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
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
            <Link
              href={"/settings"}
              className="flex items-center gap-3 rounded-xl hover:bg-gray-300/20 px-2 py-1"
            >
              <span className="icon-[carbon--settings] h-7 w-7 text-gray-600/80 dark:text-gray-300/70 font-bold"></span>
              <span className="text-gray-600/80 dark:text-gray-300/70 text-lg font-medium">
                设置
              </span>
            </Link>
            <Link
              href={"user"}
              className="flex items-center gap-3 rounded-xl hover:bg-gray-300/20 px-2 py-1"
            >
              <span className="icon-[carbon--user-avatar] h-7 w-7 text-gray-600/80 dark:text-gray-300/70 font-bold"></span>
              <span className="text-gray-600/80 dark:text-gray-300/70 text-lg font-medium">
                个人中心
              </span>
            </Link>
            <Link
              href={config.DEV_DOCS}
              className="flex items-center gap-3 rounded-xl hover:bg-gray-300/20 px-2 py-1"
            >
              <span className="icon-[carbon--document-multiple-01] h-7 w-7 text-gray-600/80 dark:text-gray-300/70 font-bold"></span>
              <span className="text-gray-600/80 dark:text-gray-300/70 text-lg font-medium">
                开发文档
              </span>
            </Link>
            <Link
              href={"https://github.com/ileostar/PosterCraft"}
              className="flex items-center gap-3 rounded-xl hover:bg-gray-300/20 px-2 py-1"
            >
              <span className="icon-[carbon--logo-github] h-7 w-7 text-gray-600/80 dark:text-gray-300/70 font-bold"></span>
              <span className="text-gray-600/80 dark:text-gray-300/70 text-lg font-medium">
                项目地址
              </span>
            </Link>
            <div
              className="cursor-pointer flex items-center gap-3 rounded-xl hover:bg-gray-300/20 px-2 py-1"
              onClick={() => logout()}
            >
              <span className="icon-[carbon--logout] h-7 w-7 text-gray-600/80 dark:text-gray-300/70 font-bold"></span>
              <span className="text-gray-600/80 dark:text-gray-300/70 text-lg font-medium">
                登出
              </span>
            </div>
          </div>
          <DrawerClose className="absolute top-3 right-3 z-50">
            <span className="icon-[carbon--close] h-7 w-7"></span>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default GlobalDrawer;
