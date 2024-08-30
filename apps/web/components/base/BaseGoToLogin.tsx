interface BaseGoToLoginProps {}

const BaseGoToLogin: React.FC<BaseGoToLoginProps> = () => {
  return (
    <button className="bg-emerald-950 dark:bg-[#E730CA]-400 text-white border border-[#E730CA]-400 dark:border-[#E730CA]/50 border-b-4 font-medium overflow-hidden relative px-4 py-1 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
      <span className="bg-[#E730CA]-400 shadow-[#E730CA]-400 absolute -top-[150%] left-0 inline-flex w-80 h-[4px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
      Login
    </button>
  );
};

export default BaseGoToLogin;
