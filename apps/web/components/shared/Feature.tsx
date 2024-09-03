"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";
import { Link } from "next-view-transitions";
import { useEffect, useState } from "react";

import BaseGoToLogin from "../base/BaseGoToLogin";
import BaseTooltips from "../base/BaseTooltip";
import BaseDrawer from "../layouts/common/GlobalDrawer";

interface FeatureProps {}

const Feature: React.FC<FeatureProps> = () => {
  const { theme, setTheme } = useTheme();
  const [token, setToken] = useState<string | null>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(window.localStorage.getItem("token"));
    }
  }, []);

  return (
    <div className="flex items-center gap-5 w-72 justify-end">
      <div className="relative hidden min-[845px]:flex bg-transparent rounded-lg  font-semibold transition-all duration-700 will-change-transform">
        <BaseTooltips
          tooltipText={"Create Post"}
          position={"bottom"}
        >
          <span className="icon-[carbon--add-alt] text-gray-700 dark:text-white w-8 h-8 rounded-full cursor-pointer"></span>
        </BaseTooltips>
      </div>
      <div className="relative hidden min-[845px]:flex bg-transparent rounded-lg  font-semibold transition-all duration-700 will-change-transform">
        <BaseTooltips
          tooltipText={"Translate"}
          position={"bottom"}
        >
          <span className="icon-[carbon--ibm-watson-language-translator]  text-gray-700 dark:text-white w-8 h-8 rounded-full cursor-pointer"></span>
        </BaseTooltips>
      </div>
      <div className="relative hidden min-[845px]:flex bg-transparent rounded-lg font-semibold transition-all duration-700 will-change-transform">
        <BaseTooltips
          tooltipText={"Toggle Dark Mode"}
          position={"bottom"}
        >
          <span
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-8 w-8 dark:h-8 dark:w-8 icon-[carbon--haze-night] dark:icon-[carbon--sun] text-gray-700 dark:text-white rounded-full cursor-pointer"
          />
        </BaseTooltips>
      </div>
      {token ? (
        <BaseDrawer />
      ) : token !== "" ? (
        <Link
          href="/auth/login"
          className="relative hidden min-[845px]:flex overflow-hidden font-semibold transition-all duration-700 will-change-transform"
        >
          <BaseGoToLogin />
        </Link>
      ) : (
        <Skeleton className="w-10 h-10 rounded-full" />
      )}
    </div>
  );
};

export default Feature;
