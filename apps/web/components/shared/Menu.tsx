"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuProps {}

const Menus = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/templates",
    label: "Templates",
  },
  {
    href: "/works",
    label: "Works",
  },
  {
    href: "/about",
    label: "About",
  },
];

const Menu: React.FC<MenuProps> = () => {
  const pathname = usePathname();

  return (
    <div className="hidden min-[845px]:flex sm:space-x-8">
      {Menus.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`relative hover:text-rose-400 text-gray-700  dark:hover:text-[#E730CA] inline-flex items-center font-bold before:content-[''] before:absolute before:bottom-2.5 before:left-1/2 before:transform before:-translate-x-1/2 before:h-[1.5px]  before:w-0 hover:before:bg-rose-400 dark:hover:before:bg-[#E730CA] before:bg-rose-400 dark:before:bg-[#E730CA] before:transition-all before:hover:w-full before:duration-500 ${pathname === item.href ? "text-rose-400 dark:text-[#E730CA] before:bg-rose-400 dark:before:bg-[#E730CA] before:w-full" : "dark:text-white"}`}
          aria-current="page"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default Menu;
