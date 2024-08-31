import ProjectCard from "@/components/shared/ProjectCard";
import Image from "next/image";

interface UserInfosProps {}

// TODO 替换接口来的信息或者从store获取
const userInfo = {
  avatar: "",
  username: "LeoStar",
  nickname: "LeoStar",
  email: "",
  phone: "",
  address: "",
};

const UserInfos: React.FC<UserInfosProps> = () => {
  return (
    <div className="flex justify-between w-full h-[40vh]">
      <div className="flex flex-1 gap-3 h-14">
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
      <div className="flex flex-1 justify-center items-center w-full h-full pl-40">
        <ProjectCard />
      </div>
    </div>
  );
};

export default UserInfos;
