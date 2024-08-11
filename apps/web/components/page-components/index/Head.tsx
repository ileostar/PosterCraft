"use client";

import Image from "next/image";
import Link from "next/link";

import "@/style/header.css";

import { useEffect } from "react";

function Head({ mode }: Readonly<{ mode: string }>) {
  useEffect(() => {
    window.onscroll = function () {
      scrollFunction();
    };

    function scrollFunction() {
      var navbar = document.querySelector(".navbar") as HTMLElement;
      if (navbar) {
        if (document.documentElement.scrollTop > window.screen.height) {
          // 当滚动距离大于 navbar 的高度时，隐藏 navbar
          navbar.classList.add("hidden");
        } else {
          // 否则，显示 navbar
          navbar.classList.remove("hidden");
        }
      }
    }
  }, []);

  return (
    <div className={`navbar z-50 bg-red-500  ${mode == "fixed" ? "myFixed " : "sticky"}`}>
      <div className="flex-1">
        <Link
          href="/"
          className="btn btn-ghost text-xl text-white"
        >
          PosterCraft
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
          >
            <Link href="/myWork">
              <div className="indicator">
                <Image
                  src="/我的作品.png"
                  alt="My Work"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-5 w-5"
                />
              </div>
            </Link>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/account">我的账号</Link>
            </li>
            <li>
              <a>退出登录</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Head;
