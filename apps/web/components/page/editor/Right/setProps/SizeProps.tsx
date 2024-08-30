import { UseElementStore } from "@/store/element";
import { useEffect, useRef, useState } from "react";

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

  useEffect(() => {
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

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // 更新ref，表示这不是第一次渲染
      return; // 跳过后续的逻辑
    }
    const style = {
      height: sizeStyles.height + "px",
      width: sizeStyles.width + "px",
      paddingTop: sizeStyles.paddingTop + "px",
      paddingBottom: sizeStyles.paddingBottom + "px",
      paddingLeft: sizeStyles.paddingLeft + "px",
      paddingRight: sizeStyles.paddingRight + "px",
    };
    updateElement(currentElement, style);
  }, [sizeStyles, currentElement, updateElement]);
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
          onChange={(e) =>
            setSizeStyles((prevStyles) => ({
              ...prevStyles,
              height: parseInt(e.target.value, 10),
            }))
          }
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
          onChange={(e) =>
            setSizeStyles((prevStyles) => ({
              ...prevStyles,
              width: parseInt(e.target.value, 10),
            }))
          }
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
          onChange={(e) =>
            setSizeStyles((prevStyles) => ({
              ...prevStyles,
              paddingTop: parseInt(e.target.value, 10),
            }))
          }
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
          onChange={(e) =>
            setSizeStyles((prevStyles) => ({
              ...prevStyles,
              paddingBottom: parseInt(e.target.value, 10),
            }))
          }
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
          onChange={(e) =>
            setSizeStyles((prevStyles) => ({
              ...prevStyles,
              paddingLeft: parseInt(e.target.value, 10),
            }))
          }
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
          onChange={(e) =>
            setSizeStyles((prevStyles) => ({
              ...prevStyles,
              paddingRight: parseInt(e.target.value, 10),
            }))
          }
          placeholder="Font size"
          className="input input-bordered w-2/3"
        />
      </div>
    </div>
  );
}

export default SizeProps;
