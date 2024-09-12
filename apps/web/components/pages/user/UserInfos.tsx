import BaseButton from "@/components/base/BaseButton";
import ProjectCard from "@/components/shared/ProjectCard";
import Image from "next/image";

interface UserInfosProps {
  isMyself: boolean;
}

// TODO 替换接口来的信息或者从store获取
const userInfo = {
  avatar: "",
  username: "LeoStar",
  nickname: "LeoStar",
  email: "hi@leostar.top",
  phone: "14709723891",
};

const UserInfos: React.FC<UserInfosProps> = (params) => {
  return (
    <div className="flex flex-wrap justify-between w-full py-8">
      <div className="flex flex-col justify-between items-center flex-1 w-full h-full pl-5">
        <div className="w-full flex flex-col gap-8">
          <div className="flex gap-8 h-20 w-full m-15">
            <Image
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              className="rounded-full w-20 h-20  group-hover:scale-105 transition-transform duration-300"
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
          <div className="flex justify-start  gap-7">
            <span className="text-sm text-gray-600/80 dark:text-gray-400/70">{userInfo.email}</span>
            <span className="text-sm text-gray-600/80 dark:text-gray-400/70">|</span>
            <span className="text-sm text-gray-600/80 dark:text-gray-400/70">{userInfo.phone}</span>
          </div>
          {params.isMyself ? (
            <div className="flex justify-start gap-5">
              <BaseButton>编辑个人信息</BaseButton>
              <BaseButton>分享</BaseButton>
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-1 justify-end pr-5 items-center w-full h-full">
        <ProjectCard />
      </div>
    </div>
  );
};

export default UserInfos;
