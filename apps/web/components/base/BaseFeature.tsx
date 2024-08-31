"use client";

import { useTheme } from "next-themes";
import Link from "next/link";

import BaseGoToLogin from "./BaseGoToLogin";
import BaseLogout from "./BaseLogout";

interface BaseFeatureProps {}

const BaseFeature: React.FC<BaseFeatureProps> = () => {
  const token = window.localStorage.getItem("token");
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center gap-5 w-72 justify-end">
      <div className="relative hidden min-[845px]:flex bg-transparent rounded-lg overflow-hidden  font-semibold transition-all duration-700 will-change-transform">
        <span className="icon-[carbon--ibm-watson-language-translator]  text-gray-700 dark:text-white w-8 h-8 rounded-full cursor-pointer"></span>
      </div>
      <div className="relative hidden min-[845px]:flex bg-transparent rounded-lg overflow-hidden font-semibold transition-all duration-700 will-change-transform">
        <span
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-8 w-8 dark:h-8 dark:w-8 icon-[carbon--haze-night] dark:icon-[carbon--sun] text-gray-700 dark:text-white rounded-full cursor-pointer"
        ></span>
      </div>
      {token ? (
        <>
          <div className="avatar relative hidden min-[845px]:flex bg-transparent rounded-lg  font-semibold transition-all duration-700 will-change-transform">
            <Link
              href={"/profile"}
              className="cursor-pointer w-10 h-10 overflow-visible group"
            >
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                className="rounded-full w-full h-full  group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
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
  );
};

export default BaseFeature;
