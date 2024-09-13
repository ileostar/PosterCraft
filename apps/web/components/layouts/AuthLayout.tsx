"use client";

import Planet from "@/components/shared/Planet";
import ShootingStar from "@/components/shared/ShootingStar";
import { Link, usePathname, useRouter } from "@/utils/i18n/routing";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    router.push(pathname, { locale: locale === "en" ? "zh" : "en" });
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative text-neutral-900 dark:text-neutral-100 max-w-2000 w-full h-full">
      <div className="h-[100vh] w-[100vw] flex overflow-hidden">
        <div className="flex-1 bg-gradient-to-r from-red-600 to-red-500 dark:bg-[#FF33DE]/30 bg-design">
          <div className="h-full flex flex-col justify-between p-5 text-white font-serif">
            <div className="text-xl">POSTERCRAFT</div>
            <div className="text-3xl">Lets Create Now！</div>
            <Link href="/">&lt; Home</Link>
          </div>
        </div>
        <div className="flex-1">
          <div className="h-full flex flex-col justify-between items-end p-5 font-serif">
            <div className="relative z-10 flex gap-2 justify-center">
              <label className="btn btn-circle dark:bg-white/30 border-0 swap swap-rotate">
                <span
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="h-7 w-7 dark:h-7 dark:w-7 icon-[carbon--haze-night] dark:icon-[carbon--sun] text-red-500 dark:text-white rounded-full cursor-pointer"
                />
              </label>
              <label className="btn btn-circle  dark:bg-white/30 border-0 swap swap-rotate">
                <span
                  onClick={toggleLocale}
                  className="icon-[carbon--ibm-watson-language-translator]  text-red-500 dark:text-white w-7 h-7 rounded-full cursor-pointer"
                ></span>
              </label>
            </div>
            <Planet />
            {isClient && theme === "light" ? "" : <ShootingStar />}
            <div>@Copyright LeoStar</div>
          </div>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
