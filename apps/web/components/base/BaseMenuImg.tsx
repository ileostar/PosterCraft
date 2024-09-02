"use client";

import { useMenuOpen } from "@/store/menu";

const BaseMenuImg: React.FC = () => {
  const { toggleMenu } = useMenuOpen();
  return (
    <div className="-mr-2 flex items-center min-[845px]:hidden">
      <button
        type="button"
        onClick={() => toggleMenu(true)}
        className="relative items-center justify-center flex p-1 text-gray-700 dark:text-white hover:text-[#E730CA] focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 transition-colors"
        aria-controls="mobile-menu"
        aria-expanded="false"
      >
        <span className="absolute -inset-0.5"></span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default BaseMenuImg;
