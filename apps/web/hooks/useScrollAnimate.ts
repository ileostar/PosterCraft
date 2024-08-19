import { useEffect, useRef } from "react";

/**
 * 滚动动画 Hook
 *1.使用时先在相应页面引入style下的scrollAnimate.css文件；
 *2.然后定义const boxRef = useRef<HTMLDivElement>(null);
 *3.在需要监听的元素上添加ref={boxRef}和className="box"
 *4.最后调用钩子useScrollAnimate(boxRef)，传入需要监听的元素
 * @param boxRef 传入需要监听滚动的 HTML 元素的 React Ref
 * @returns 无返回值
 */
export function useScrollAnimate(boxRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const handleScroll = () => {
      const box = boxRef.current;
      if (box) {
        const isBoxVisible = box.getBoundingClientRect().top + 100 < window.innerHeight;
        if (isBoxVisible && !box.classList.contains("isVisible")) {
          box.classList.add("isVisible");
        }
        if (!isBoxVisible && box.classList.contains("isVisible")) {
          box.classList.remove("isVisible");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [boxRef]);
}
