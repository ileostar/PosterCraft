interface BaseInfoProps {
  icon?: string;
  title: string;
}

const BaseInfo: React.FC<BaseInfoProps> = ({ icon, title }) => {
  return (
    <div className="flex items-center justify-center bg-gray-600 h-full">
      {icon && (
        <img
          src={icon}
          alt="icon"
        />
      )}
      <span>{title}</span>
    </div>
  );
};

export default BaseInfo;
