"use client";

import { cn } from "@/lib/utils";
import { useMenuOpen } from "@/stores/menu";
import { useTheme } from "next-themes";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { usePathname } from "next/navigation";

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

const SideMenu: React.FC = () => {
  const { isMenuOpen, toggleMenu } = useMenuOpen();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

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

            <div className="flex grow flex-col gap-y-5 overflow-y-auto dark:bg-[#131313] bg-[#f5f7f8f2] px-6 pb-2">
              <div className="flex h-16 shrink-0 items-center">
                <Image
                  src="/favicon.png"
                  className="mt-2 logo-svg transform hover: transition-transform duration-700 will-change-transform"
                  width="40"
                  height="35"
                  alt="Poster Craft Logo"
                />
              </div>
              <div className="flex flex-col">
                <div
                  role="list"
                  className="flex flex-1 flex-col gap-y-2"
                >
                  {Menus.map((menu) => (
                    <Link
                      href={menu.href}
                      className={`hover:bg-[#FB7185]/80 hover:text-white dark:hover:dark:bg-[#E730CA]/80 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ",${pathname === menu.href ? " bg-[#FB7185] dark:bg-[#E730CA] text-white" : "text-gray-300"}`}
                    >
                      {menu.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex gap-5 items-center">
                <span
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="h-8 w-8 dark:h-8 dark:w-8 icon-[carbon--haze-night] dark:icon-[carbon--sun] text-gray-700 dark:text-white rounded-full cursor-pointer"
                />
                <span className="icon-[carbon--ibm-watson-language-translator]  text-gray-700 dark:text-white w-8 h-8 rounded-full cursor-pointer"></span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  );
};

export default SideMenu;
