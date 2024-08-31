interface BaseButtonProps {
  className?: string;
  children: React.ReactNode;
}

const BaseButton: React.FC<BaseButtonProps> = ({ children, className }) => {
  return (
    <button
      className={`relative shadow-md duration-500 group cursor-pointer overflow-hidden h-12 w-40 text-white rounded-xl p-2 flex justify-center items-center font-extrabold dark:hover:text-black ${className}`}
    >
      <div className="absolute z-10 w-48 h-48 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-rose-200/90 delay-150 group-hover:delay-75 dark:bg-sky-900"></div>
      <div className="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-rose-300/80 delay-150 group-hover:delay-100 dark:bg-sky-800"></div>
      <div className="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-rose-400/70 delay-150 group-hover:delay-150 dark:bg-sky-700"></div>
      <div className="absolute z-10 w-16 h-16 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-rose-500/60 delay-150 group-hover:delay-200 dark:bg-sky-600"></div>
      <p className="z-10">{children}</p>
    </button>
  );
};

export default BaseButton;
