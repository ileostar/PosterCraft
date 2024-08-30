"use client";

import BaseGoToLogin from "@/components/base/BaseGoToLogin";
import BaseLogout from "@/components/base/BaseLogout";
import useDark from "@/hooks/useDark";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { toggleDark } = useDark();
  const [isOpen, setIsOpen] = useState(false);
  const token = window.localStorage.getItem("token");

  return (
    <header className={`w-full mx-auto ${className}`}>
      <div className="px-4 pt-4 min-[845px]:pt-9 transition-all justify-between">
        <div className="flex justify-between">
          <div className="flex w-72">
            <div className="logo flex flex-shrink-0 items-center text-white hover:text-[#E730CA] transition-colors">
              <Image
                src="/favicon.png"
                className="hidden md:block logo-svg transform hover: transition-transform duration-700 will-change-transform"
                width="52"
                height="44"
                alt="Poster Craft Logo"
              />
              <Image
                src="/favicon.png"
                className="md:hidden"
                width="37"
                height="31"
                alt="Poster Craft Logo"
              />
            </div>
          </div>

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

          <div className="flex items-center gap-5 w-72 justify-end">
            <div className="relative hidden min-[845px]:flex bg-transparent rounded-lg overflow-hidden  font-semibold transition-all duration-700 will-change-transform">
              <span className="icon-[carbon--ibm-watson-language-translator] w-8 h-8 rounded-full cursor-pointer"></span>
            </div>
            <div className="relative hidden min-[845px]:flex bg-transparent rounded-lg overflow-hidden  font-semibold transition-all duration-700 will-change-transform">
              <span
                onClick={() => toggleDark()}
                className="h-8 w-8 dark:h-8 dark:w-8 icon-[carbon--haze-night] dark:icon-[carbon--sun] rounded-full cursor-pointer"
              ></span>
            </div>
            {token ? (
              <>
                <div className="avatar relative hidden min-[845px]:flex bg-transparent rounded-lg overflow-hidden  font-semibold transition-all duration-700 will-change-transform">
                  <div className="cursor-pointer w-10 h-10 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <BaseLogout className="hidden min-[845px]:flex" />
              </>
            ) : (
              <Link
                href="/auth/login"
                className="relative hidden min-[845px]:flex overflow-hidden font-semibold transition-all duration-700 will-change-transform"
              >
                <BaseGoToLogin />
              </Link>
            )}
          </div>

          {/* 菜单 */}
          <div className="-mr-2 flex items-center min-[845px]:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="relative items-center justify-center flex p-1 text-white hover:text-[#E730CA] focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 transition-colors"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="relative z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-900/80"></div>
          <div className="fixed inset-0 flex">
            <div className="relative mr-16 flex w-full max-w-xs flex-1">
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button
                  onClick={() => setIsOpen(false)}
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
        </div>
      )}
    </header>
  );
};

export default Header;
