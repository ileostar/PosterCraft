"use client";

import Lenis from "lenis";
import React, { useEffect } from "react";

import Footer from "./common/Footer";
import Header from "./common/Header";

import "@/styles/pages/base.css";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // 滑动持续时间
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 自定义缓动函数
      touchMultiplier: 2,
      infinite: false,
      smoothWheel: true,
      wheelMultiplier: 1.5,
      lerp: 0.05, // 平滑度
      orientation: "vertical", // 滚动方向
      gestureOrientation: "vertical", // 手势方向
      syncTouch: false, // 模拟触摸设备滚动
      syncTouchLerp: 0.075, // 同步触摸平滑度
      touchInertiaMultiplier: 35, // 触摸惯性倍率
      autoResize: true, // 自动调整大小
      prevent: (node) => node.classList.contains("cookie-modal"), // 自定义阻止滚动平滑的逻辑
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // 监听滚动事件
    lenis.on("scroll", ({ scroll, velocity, direction }) => {
      console.log(`Scroll: ${scroll}, Velocity: ${velocity}, Direction: ${direction}`);
      // 你可以在这里添加自定义的滚动处理逻辑
    });

    return () => {
      cancelAnimationFrame(rafId); // 取消动画帧请求
      lenis.destroy(); // 清理Lenis实例
    };
  }, []);

  return (
    <div className="min-h-svh overflow-hidden p-1.5 btn--animateGlowPink duration-300 ease-out">
      <Header className="max-w-7xl px-4 sm:px-8 md:px-12 xl:px-0 mx-auto" />
      <main className="scrollBox relative overflow-hidden mt-6 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 xl:px-0">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
