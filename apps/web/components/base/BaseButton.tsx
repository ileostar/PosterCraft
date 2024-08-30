interface BaseButtonProps {
  className?: string;
  children: React.ReactNode;
}

const BaseButton: React.FC<BaseButtonProps> = ({ children, className }) => {
  return (
    <button
      className={`relative shadow-md duration-500 group cursor-pointer  overflow-hidden h-12 w-40 dark:text-[#d3ccd2] rounded-lg bg-sky-800/50 p-2 flex justify-center items-center font-extrabold ${className}`}
    >
      <div className="absolute z-10 w-48 h-48 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-900 delay-150 group-hover:delay-75"></div>
      <div className="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-800 delay-150 group-hover:delay-100"></div>
      <div className="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-700 delay-150 group-hover:delay-150"></div>
      <div className="absolute z-10 w-16 h-16 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-600 delay-150 group-hover:delay-200"></div>
      <div className="absolute z-10 w-10 h-10 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-500 delay-150 group-hover:delay-300"></div>
      <p className="z-10">{children}</p>
    </button>
  );
};

export default BaseButton;
