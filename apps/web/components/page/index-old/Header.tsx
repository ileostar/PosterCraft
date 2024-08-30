"use client";

import Link from "next/link";

import "@/style/header.css";

import { useEffect } from "react";

function Head({ mode }: Readonly<{ mode: string }>) {
  useEffect(() => {
    window.onscroll = function () {
      scrollFunction();
    };

    function scrollFunction() {
      let navbar = document.querySelector(".navbar") as HTMLElement;
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
    <div
      className={`navbar bg-background/30 fixed inset-x-0 top-4 z-40 mx-auto flex h-[60px] max-w-7xl items-center justify-between rounded-2xl px-8 shadow-sm saturate-100 backdrop-blur-[10px] transition-colors ${mode == "fixed" ? "fixed" : "sticky"}`}
    >
      <div className="flex-1">
        <Link
          href="/"
          className="btn btn-ghost text-xl"
        >
          PosterCraft
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            className="btn btn-ghost btn-circle"
          >
            <Link href="/myWork">
              <span className="icon-[carbon--add-filled] text-4xl text-red-500"></span>
            </Link>
          </button>
        </div>
        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </button>
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
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
