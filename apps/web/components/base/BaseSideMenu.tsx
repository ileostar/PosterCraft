"use client";

import { useMenuOpen } from "@/store/menu";
import Image from "next/image";

const BaseSideMenu: React.FC = () => {
  const { isMenuOpen, toggleMenu } = useMenuOpen();

  return (
    isMenuOpen && (
      <nav
        className="relative z-50 lg:hidden"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-900/80"></div>
        <div className="fixed inset-0 flex">
          <div className="relative mr-16 flex w-full max-w-xs flex-1">
            <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
              <button
                onClick={() => toggleMenu(false)}
                className="-m-2.5 p-2.5"
              >
                <span className="sr-only">Close sidebar</span>
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#131313] px-6 pb-2">
              <div className="flex h-16 shrink-0 items-center">
                <Image
                  src="/favicon.png"
                  className="mt-2 logo-svg transform hover: transition-transform duration-700 will-change-transform"
                  width="40"
                  height="35"
                  alt="Poster Craft Logo"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <ul
                  role="list"
                  className="flex flex-1 flex-col gap-y-7"
                >
                  <li>
                    <ul
                      role="list"
                      className="-mx-2 space-y-1"
                    >
                      <li>
                        <a
                          href="/"
                          className="bg-[#E730CA]/80 text-white group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        >
                          Home
                        </a>
                      </li>
                      <li>
                        <a
                          href="/templates"
                          className="text-gray-300 hover:text-white hover:bg-[#E730CA]/80 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        >
                          Templates
                        </a>
                      </li>
                      <li>
                        <a
                          href="/works"
                          className="text-gray-300 hover:text-white hover:bg-[#E730CA]/80 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        >
                          Works
                        </a>
                      </li>
                      <li>
                        <a
                          href="/about"
                          className="text-gray-300 hover:text-white hover:bg-[#E730CA]/80 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        >
                          About
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  );
};

export default BaseSideMenu;
