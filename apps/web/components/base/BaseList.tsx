import BaseGrid from "./BaseGrid";
import BaseSearch from "./BaseSearch";

interface BaseListsProps {
  title: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const BaseList: React.FC<BaseListsProps> = ({ title, children, onClick }) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-full">
      <div className="w-full flex justify-between items-center mt-5">
        <h3 className="font-bold text-rose-500 dark:text-[#FF33DE] text-3xl">{title}</h3>
        <BaseSearch onClick={onClick} />
      </div>
      {children && <BaseGrid>{children}</BaseGrid>}
    </div>
  );
};

export default BaseList;
