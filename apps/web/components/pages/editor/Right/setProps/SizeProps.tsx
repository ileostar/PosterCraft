"use client";

import { UseElementStore } from "@/stores/element";
import { useEffect, useState } from "react";

function SizeProps() {
  const { updateElement, currentElement, getElement, currentSize } = UseElementStore();

  interface SizeStyleState {
    height: number;
    width: number;
    paddingTop: number;
    paddingBottom: number;
    paddingLeft: number;
    paddingRight: number;
  }

  const initialState = {
    height: 0,
    width: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  };

  const [sizeStyles, setSizeStyles] = useState<SizeStyleState>(initialState);

  const reset = () => {
    sizeStyles.height = 0;
    sizeStyles.width = 0;
    sizeStyles.paddingTop = 0;
    sizeStyles.paddingBottom = 0;
    sizeStyles.paddingLeft = 0;
    sizeStyles.paddingRight = 0;
  };

  useEffect(() => {
    reset();
    const res = getElement(currentElement);
    const resProps = res?.props;
    setSizeStyles((prevStyles) => {
      const updatedStyles = { ...prevStyles };
      if (resProps) {
        Object.keys(resProps).forEach((key) => {
          if (key in prevStyles) {
            switch (key) {
              case "height":
              case "width":
              case "paddingRight":
              case "paddingLeft":
              case "paddingBottom":
              case "paddingTop":
                const num = parseFloat(resProps[key]);
                updatedStyles[key] = !isNaN(num) ? num : prevStyles[key];
                break;
            }
          }
        });
      }
      return updatedStyles;
    });
  }, [currentElement, getElement, currentSize]);

  const handleUpdate = (updateKey: string, updateValue: any) => {
    setSizeStyles((prevStyles) => ({
      ...prevStyles,
      [updateKey]: updateValue,
    }));
    const style = {
      height: updateKey == "height" ? updateValue + "px" : sizeStyles.height + "px",
      width: updateKey == "width" ? updateValue + "px" : sizeStyles.width + "px",
      paddingTop: updateKey == "paddingTop" ? updateValue + "px" : sizeStyles.paddingTop + "px",
      paddingBottom:
        updateKey == "paddingBottom" ? updateValue + "px" : sizeStyles.paddingBottom + "px",
      paddingLeft: updateKey == "paddingLeft" ? updateValue + "px" : sizeStyles.paddingLeft + "px",
      paddingRight:
        updateKey == "paddingRight" ? updateValue + "px" : sizeStyles.paddingRight + "px",
    };

    updateElement(currentElement, style);
  };

  return (
    <div className="py-1 px-6 ">
      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="height"
          className="block mb-1 w-1/3"
        >
          高度：
        </label>
        <input
          type="number"
          id="height"
          value={sizeStyles.height}
          onChange={(e) => handleUpdate("height", parseInt(e.target.value, 10))}
          placeholder="Font size"
          className="input input-bordered w-2/3"
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="width"
          className="block mb-1 w-1/3"
        >
          宽度：
        </label>
        <input
          type="number"
          id="width"
          value={sizeStyles.width}
          onChange={(e) => handleUpdate("width", parseInt(e.target.value, 10))}
          placeholder="Font size"
          className="input input-bordered w-2/3"
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="paddingTop"
          className="block mb-1 w-1/3"
        >
          上边距：
        </label>
        <input
          type="text"
          id="paddingTop"
          value={sizeStyles.paddingTop}
          onChange={(e) => handleUpdate("paddingTop", parseInt(e.target.value, 10))}
          placeholder="Font size"
          className="input input-bordered w-2/3"
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="paddingBottom"
          className="block mb-1 w-1/3"
        >
          下边距：
        </label>
        <input
          type="text"
          id="paddingBottom"
          value={sizeStyles.paddingBottom}
          onChange={(e) => handleUpdate("paddingBottom", parseInt(e.target.value, 10))}
          placeholder="Font size"
          className="input input-bordered w-2/3"
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="paddingLeft"
          className="block mb-1 w-1/3"
        >
          左边距：
        </label>
        <input
          type="text"
          id="paddingLeft"
          value={sizeStyles.paddingLeft}
          onChange={(e) => handleUpdate("paddingLeft", parseInt(e.target.value, 10))}
          placeholder="Font size"
          className="input input-bordered w-2/3"
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="paddingRight"
          className="block mb-1 w-1/3"
        >
          右边距：
        </label>
        <input
          type="text"
          id="paddingRight"
          value={sizeStyles.paddingRight}
          onChange={(e) => handleUpdate("paddingRight", parseInt(e.target.value, 10))}
          placeholder="Font size"
          className="input input-bordered w-2/3"
        />
      </div>
    </div>
  );
}

export default SizeProps;
