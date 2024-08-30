import Link from "next/link";

interface BaseMenuProps {}

const BaseMenu: React.FC<BaseMenuProps> = () => {
  return (
    <div className="hidden min-[845px]:flex sm:space-x-8">
      <Link
        href="/"
        className="relative text-[#E730CA] hover:text-[#E730CA] inline-flex items-center font-bold before:content-[''] before:absolute before:bottom-2.5 before:left-1/2 before:transform before:-translate-x-1/2 before:h-[1.5px] before:w-full before:bg-white"
        aria-current="page"
      >
        Home
      </Link>
      <Link
        href="/templates"
        className="relative text-white hover:text-[#E730CA] inline-flex items-center font-bold before:content-[''] before:absolute before:bottom-2.5 before:left-1/2 before:transform before:-translate-x-1/2 before:h-[1.5px] before:w-0 before:bg-white before:transition-all before:hover:w-full before:duration-500"
      >
        Templates
      </Link>
      <Link
        href="/works"
        className="relative text-white hover:text-[#E730CA] inline-flex items-center font-bold before:content-[''] before:absolute before:bottom-2.5 before:left-1/2 before:transform before:-translate-x-1/2 before:h-[1.5px] before:w-0 before:bg-white before:transition-all before:hover:w-full before:duration-500"
      >
        Works
      </Link>
      <Link
        href="/about"
        className="relative text-white hover:text-[#E730CA] inline-flex items-center font-bold before:content-[''] before:absolute before:bottom-2.5 before:left-1/2 before:transform before:-translate-x-1/2 before:h-[1.5px] before:w-0 before:bg-white before:transition-all before:hover:w-full before:duration-500"
      >
        About
      </Link>
    </div>
  );
};

export default BaseMenu;
