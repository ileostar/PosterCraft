interface BaseListsProps {
  title: string;
  children?: React.ReactNode;
}

const BaseList: React.FC<BaseListsProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-full">
      <div className="w-full flex justify-between items-center mt-5">
        <h3 className="font-bold text-rose-500 dark:text-[#FF33DE] text-3xl">{title}</h3>
        <input
          className="p-2 border-2 border-gray-400 bg-gray-300/30 rounded-md outline-none text-sm"
          type="text"
        />
      </div>
      {children && (
        <ul className="w-full mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {children}
        </ul>
      )}
    </div>
  );
};

export default BaseList;
