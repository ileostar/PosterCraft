import Image from "next/image";

interface BaseInfoProps {
  icon?: string;
  title: string;
  content: string;
}

const BaseInfo: React.FC<BaseInfoProps> = ({ icon, title, content }) => {
  return (
    <div className="flex items-center justify-center bg-gray-300/30 rounded-xl h-full">
      {icon && (
        <Image
          src={icon}
          alt="icon"
          width={64}
          height={64}
          className="rounded-full"
        />
      )}
      <div className="flex flex-col justify-center p-4">
        <h3>{title}</h3>
        <span>{content}</span>
      </div>
    </div>
  );
};

export default BaseInfo;
