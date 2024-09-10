"use client";

import ColorPicker from "@/components/shared/ColorPicker";
import UploadBackground from "@/components/shared/UploadBackground";
import { UseElementStore } from "@/stores/element";
import { useEffect, useRef, useState } from "react";

function SetPage() {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [childStyle, setChildStyle] = useState({});

  useEffect(() => {
    if (parentRef.current) {
      const parentHeight = parentRef.current.offsetHeight;
      setChildStyle({ maxHeight: `${parentHeight}px`, overflowY: "auto" });
    }
  }, []);

  const { pageBackgroundStyle, setPageBackgroundStyle } = UseElementStore();

  //上传图片的回调函数
  const handleOssUrl = (url: string) => {
    setPageBackgroundStyle({ ...pageBackgroundStyle, backgroundImage: `url(${url})` });
  };

  return (
    <div
      className="h-full"
      ref={parentRef}
    >
      <div
        style={childStyle}
        className="overflow-x-hidden"
      >
        <div className="py-1 px-6 ">
          <div className="flex justify-between items-center my-4">
            <label
              htmlFor="color"
              className="block mb-1 w-1/3 text-sm"
            >
              背景颜色：
            </label>
            <ColorPicker
              changeColor={(e) =>
                setPageBackgroundStyle({ ...pageBackgroundStyle, backgroundColor: e })
              }
            />
          </div>

          <div className="flex justify-between items-center my-4">
            <label
              htmlFor="fontFamily"
              className="block mb-1 w-1/3 text-sm"
            >
              适应方式：
            </label>
            <select
              id="fontFamily"
              value={pageBackgroundStyle.backgroundSize}
              onChange={(e) =>
                setPageBackgroundStyle({ ...pageBackgroundStyle, backgroundSize: e.target.value })
              }
              className="select select-bordered w-2/3"
            >
              <option value={"100% 100%"}>自动填充</option>
              <option value={"cover"}>自动覆盖</option>
              <option value={"contain"}>自动缩放</option>
            </select>
          </div>

          <UploadBackground
            className="mt-8 flex justify-between gap-3 items-center my-4"
            handleOssUrl={handleOssUrl}
            img={pageBackgroundStyle.backgroundImage.replace(/url\(|\)/g, "")}
          />
        </div>
      </div>
    </div>
  );
}

export default SetPage;
