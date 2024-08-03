import { useState } from "react";

import ColorPicker from "../../../../base/ColorPicker";

function ShadowProps() {
  const [fontSize, setFontSize] = useState<string>("");
  const [fontFamily, setFontFamily] = useState<string>("");
  const [fontStyle, setFontStyle] = useState<string>("");
  const [lineHeight, setLineHeight] = useState<number>(0);

  return (
    <div className="py-1 px-6 ">
      
      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="lineHeight"
          className="block mb-1 w-1/3"
        >
          阴影大小：
        </label>
        <input
          id="lineHeight"
          type="range"
          min={0}
          max={100}
          value={lineHeight}
          onChange={(e) => setLineHeight(parseInt(e.target.value, 10))}
          className="range range-xs w-2/3"
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="lineHeight"
          className="block mb-1 w-1/3"
        >
          阴影模糊：
        </label>
        <input
          id="lineHeight"
          type="range"
          min={0}
          max={100}
          value={lineHeight}
          onChange={(e) => setLineHeight(parseInt(e.target.value, 10))}
          className="range range-xs w-2/3"
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="lineHeight"
          className="block mb-1 w-1/3"
        >
          透明度：
        </label>
        <input
          id="lineHeight"
          type="range"
          min={0}
          max={100}
          value={lineHeight}
          onChange={(e) => setLineHeight(parseInt(e.target.value, 10))}
          className="range range-xs w-2/3"
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="color"
          className="block mb-1 w-1/3"
        >
          阴影颜色：
        </label>
        <ColorPicker />
      </div>

       
    </div>
  );
}

export default ShadowProps;
