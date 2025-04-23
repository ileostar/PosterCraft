interface BaseGridProps {
  children: React.ReactNode;
}

const BaseGrid: React.FC<BaseGridProps> = ({ children }) => {
  return (
    <ul className="w-full mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {children}
    </ul>
  );
};

export default BaseGrid;
