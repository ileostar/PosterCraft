import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Image from "next/image";
import Link from "next/link";

interface BaseDrawerProps {}

// TODO 替换接口来的信息或者从store获取
const userInfo = {
  avatar: "",
  username: "LeoStar",
  nickname: "LeoStar",
  email: "",
  phone: "",
  address: "",
};

const BaseDrawer: React.FC<BaseDrawerProps> = () => {
  // TODO 退出登陆
  const logout = async () => {};

  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <div className="cursor-pointer w-10 h-10 overflow-visible group">
          <Image
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            className="rounded-full w-full h-full  group-hover:scale-105 transition-transform duration-300"
            alt={"avatar"}
            width={100}
            height={100}
          />
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-[100vh] w-[400px]  dark:bg-[#1F2937] px-6 pb-6">
        <div className="relative w-full h-full">
          <div className="flex gap-5 h-16">
            <Image
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              className="rounded-full w-16 h-16  group-hover:scale-105 transition-transform duration-300"
              alt={"avatar"}
              width={100}
              height={100}
            />
            <div className="h-full flex flex-col justify-center gap-1">
              <h3 className="text-2xl font-bold text-gray-300/80">{userInfo.nickname}</h3>
              <p className="text-sm text-gray-400/70">{userInfo.username}</p>
            </div>
          </div>
          <div className="mt-8 text-gray-500 flex flex-col gap-2">
            <Link
              href={"/profile"}
              className="flex items-center gap-3 rounded-xl hover:bg-gray-300/20 px-2 py-1"
            >
              <span className="icon-[carbon--user-avatar] h-9 w-9 text-gray-300/70 font-bold"></span>
              <span className="text-gray-300/70 text-xl font-medium">个人中心</span>
            </Link>
            <div
              className="cursor-pointer flex items-center gap-3 rounded-xl hover:bg-gray-300/20 px-2 py-1"
              onClick={() => logout()}
            >
              <span className="icon-[carbon--logout] h-9 w-9 text-gray-300/70 font-bold"></span>
              <span className="text-gray-300/70 text-xl font-medium">登出</span>
            </div>
          </div>
          <DrawerClose className="absolute top-5 right-5 z-50">
            <span className="icon-[carbon--close] h-7 w-7"></span>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default BaseDrawer;
