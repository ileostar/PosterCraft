import { UseElementStore } from "@/store/element";
import { useEffect, useRef, useState } from "react";

import ColorPicker from "../../../../shared/ColorPicker";

function BorderProps() {
  const { updateElement, currentElement, getElement } = UseElementStore();

  interface BorderStyleState {
    borderStyle: string;
    borderWidth: number;
    borderRadius: number;
    borderColor: string;
  }

  const initialState = {
    borderStyle: "",
    borderWidth: 0,
    borderRadius: 0,
    borderColor: "",
  };

  const [borderStyles, setBorderStyles] = useState<BorderStyleState>(initialState);

  useEffect(() => {
    const res = getElement(currentElement);
    const resProps = res?.props;
    setBorderStyles((prevStyles) => {
      const updatedStyles = { ...prevStyles };
      if (resProps) {
        Object.keys(resProps).forEach((key) => {
          if (key in prevStyles) {
            switch (key) {
              case "borderWidth":
              case "borderRadius":
                const num = parseFloat(resProps[key]);
                updatedStyles[key] = !isNaN(num) ? num : prevStyles[key];
                break;
              case "borderStyle":
              case "borderColor":
                updatedStyles[key] = resProps[key];
                break;
            }
          }
        });
      }
      return updatedStyles;
    });
  }, [currentElement, getElement]);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // 更新ref，表示这不是第一次渲染
      return; // 跳过后续的逻辑
    }
    const style = {
      borderWidth: borderStyles.borderWidth + "px",
      borderStyle: borderStyles.borderStyle,
      borderColor: borderStyles.borderColor,
      borderRadius: borderStyles.borderRadius + "px",
    };
    updateElement(currentElement, style);
  }, [borderStyles, currentElement, updateElement]);

  return (
    <div className="py-1 px-6 ">
      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="borderStyle"
          className="block mb-1 w-1/3"
        >
          边框类型：
        </label>
        <select
          id="borderStyle"
          value={borderStyles.borderStyle || ""}
          onChange={(e) => {
            setBorderStyles((prevStyles) => ({
              ...prevStyles,
              borderStyle: e.target.value,
            }));
          }}
          className="select select-bordered w-2/3"
        >
          <option value="none">无边框</option>
          <option value="solid">实线</option>
          <option value="dashed">虚线</option>
          <option value="dotted">点线</option>
          <option value="double">虚线</option>
        </select>
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="borderWidth"
          className="block mb-1 w-1/3"
        >
          边框宽度：
        </label>
        <input
          id="borderWidth"
          type="range"
          min={0}
          max={50}
          value={borderStyles.borderWidth}
          onChange={(e) => {
            setBorderStyles((prevStyles) => ({
              ...prevStyles,
              borderWidth: parseInt(e.target.value, 10),
            }));
          }}
          className="range range-xs w-2/3"
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="borderRadius"
          className="block mb-1 w-1/3"
        >
          边框圆角：
        </label>
        <input
          id="borderRadius"
          type="range"
          min={0}
          max={100}
          value={borderStyles.borderRadius}
          onChange={(e) => {
            setBorderStyles((prevStyles) => ({
              ...prevStyles,
              borderRadius: parseInt(e.target.value, 10),
            }));
          }}
          className="range range-xs w-2/3"
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="color"
          className="block mb-1 w-1/3"
        >
          边框颜色：
        </label>
        <ColorPicker
          changeColor={(e) =>
            setBorderStyles((prevStyles) => ({
              ...prevStyles,
              borderColor: e,
            }))
          }
        />
      </div>
    </div>
  );
}

export default BorderProps;
