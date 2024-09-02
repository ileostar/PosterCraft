import BaseGrid from "../base/BaseGrid";
import BaseSearch from "../base/BaseSearch";

interface ShowListsProps {
  title: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const ShowLists: React.FC<ShowListsProps> = ({ title, children, onClick }) => {
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

export default ShowLists;