import { UseElementStore } from "@/store/element";
import { useEffect, useRef, useState } from "react";

function EventProps() {
  const [clickURL, setClickURL] = useState<string>("");

  const { updateElement, currentElement, getElement } = UseElementStore();

  useEffect(() => {
    const res = getElement(currentElement);
    const resUrl = res?.url;
    setClickURL(resUrl);
  }, [currentElement, getElement]);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // 更新ref，表示这不是第一次渲染
      return; // 跳过后续的逻辑
    }
    updateElement(currentElement, undefined, undefined, clickURL);
  }, [clickURL, currentElement, updateElement]);

  return (
    <div className="py-1 px-6 ">
      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="fontSize"
          className="block mb-1 w-1/3"
        >
          点击跳转：
        </label>
        <input
          type="text"
          id="fontSize"
          value={clickURL}
          onChange={(e) => setClickURL(e.target.value)}
          placeholder="输入跳转URL"
          className="input input-bordered w-2/3"
        />
      </div>
    </div>
  );
}

export default EventProps;
