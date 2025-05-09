"use client";

import { HeaderMenus } from "@/config";
import { Link, usePathname } from "@/utils/i18n/routing";
import { useLocale } from "next-intl";

interface MenuProps {}

const Menu: React.FC<MenuProps> = () => {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="hidden min-[845px]:flex sm:space-x-8">
      {HeaderMenus().map((menu) => (
        <Link
          key={menu.label}
          href={menu.href}
          className={`relative hover:text-rose-400 text-gray-700  dark:hover:text-[#E730CA] inline-flex items-center font-bold before:content-[''] before:absolute before:bottom-2.5 before:left-1/2 before:transform before:-translate-x-1/2 before:h-[1.5px]  before:w-0 hover:before:bg-rose-400 dark:hover:before:bg-[#E730CA] before:bg-rose-400 dark:before:bg-[#E730CA] before:transition-all before:hover:w-full before:duration-500 ${pathname.replace(`/${locale}`, "") === menu.href ? "text-rose-400 dark:text-[#E730CA] before:bg-rose-400 dark:before:bg-[#E730CA] before:w-full" : "dark:text-white"}`}
          aria-current="page"
        >
          {menu.label}
        </Link>
      ))}
    </div>
  );
};

export default Menu;
