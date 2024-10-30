"use client";

import { getUserInfo } from "@/api/user";
import MenuItem from "@/components/shared/MenuItem";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useToast } from "@/components/ui/use-toast";
import { GlobalEnvConfig } from "@/config";
import { useToken } from "@/hooks/useToken";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/user";
import { usePathname, useRouter } from "@/utils/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

interface GlobalDrawerProps {
  className?: string;
}

const GlobalDrawer: React.FC<GlobalDrawerProps> = ({ className }) => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [_, setToken] = useToken();
  const { userId, setUserId } = useUserStore();
  const logout = async () => {
    setToken(null);
    setUserId(null);
    toast({
      title: "登出成功",
      description: "自动跳转到登录页面",
    });
    setTimeout(() => {
      router.push("/auth/login");
    }, 1000);
  };

  const toggleLocale = () => {
    router.push(pathname, { locale: locale === "en" ? "zh" : "en" });
  };

  const Info = {
    avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp", //默认头像
    username: "", //非空
    nickname: "---", //默认昵称
  };
  const [userInfo, setUserInfo] = useState(Info);

  const DrawerMenuItems = [
    {
      href: "/settings",
      iconClass: "icon-[carbon--settings]",
      text: t("settings"),
    },
    {
      href: `/user/${userId}`,
      iconClass: "icon-[carbon--user-avatar]",
      text: t("personal-center"),
    },
    {
      href: GlobalEnvConfig.DEV_DOCS,
      iconClass: "icon-[carbon--document-multiple-01]",
      text: t("develop-document"),
    },
    {
      href: "https://github.com/ileostar/PosterCraft",
      iconClass: "icon-[carbon--logo-github]",
      text: t("project-address"),
    },
  ];

  const getUserData = async (id: string) => {
    const res = await getUserInfo(id);
    setUserInfo(() => ({
      avatar: res.data.data?.avatar || Info.avatar,
      username: res.data.data?.username || Info.username,
      nickname: res.data.data?.nickname || Info.nickname,
    }));
  };
  useEffect(() => {
    if (userId !== null) {
      getUserData(userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Drawer direction="right">
      <DrawerTrigger className="overflow-visible">
        <div className="relative hidden min-[845px]:flex bg-transparent rounded-lg font-semibold transition-all duration-700 will-change-transform">
          <div className="cursor-pointer group">
            <div className="relative overflow-visible">
              <Image
                src={userInfo.avatar}
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
              src={userInfo.avatar}
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
              ClassName="icon-[carbon--ibm-watson-language-translator]"
              text={t("language-switching")}
              onClick={() => toggleLocale()}
            />
            <MenuItem
              ClassName="dark:h-7 dark:w-7 icon-[carbon--haze-night] dark:icon-[carbon--sun]"
              text={t("topic-switching")}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
            <MenuItem
              ClassName="icon-[carbon--logout]"
              text={t("log-out")}
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
