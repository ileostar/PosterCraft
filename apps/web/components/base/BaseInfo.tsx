import Image from "next/image";

interface BaseInfoProps {
  icon?: string;
  title: string;
}

const BaseInfo: React.FC<BaseInfoProps> = ({ icon, title }) => {
  return (
    <div className="flex items-center justify-center bg-gray-300/50 rounded-xl h-full">
      {icon && (
        <Image
          src={icon}
          alt="icon"
          width={64}
          height={64}
          className="rounded-full"
        />
      )}
      <span>{title}</span>
    </div>
  );
};

export default BaseInfo;
