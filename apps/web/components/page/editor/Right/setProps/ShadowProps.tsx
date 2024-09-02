import { UseElementStore } from "@/store/element";
import { useEffect, useState } from "react";

import ColorPicker from "../../../../base/ColorPicker";

function ShadowProps() {
  const { updateElement, currentElement, getElement } = UseElementStore();

  interface ShadowStyleState {
    hOffset: number;
    vOffset: number;
    blur: number;
    spread: number;
    color: string;
    opacity: number;
  }

  const initialState = {
    hOffset: 0,
    vOffset: 0,
    blur: 0,
    spread: 0,
    color: "red",
    opacity: 100,
  };

  const [shadowStyles, setShadowStyles] = useState<ShadowStyleState>(initialState);

  const reset = () => {
    shadowStyles.hOffset = 0;
    shadowStyles.vOffset = 0;
    shadowStyles.blur = 0;
    shadowStyles.spread = 0;
    shadowStyles.color = "red";
    shadowStyles.opacity = 100;
  };

  useEffect(() => {
    reset();
    const res = getElement(currentElement);
    const resProps = res?.props;
    setShadowStyles((prevStyles) => {
      const updatedStyles = { ...prevStyles };
      if (resProps) {
        Object.keys(resProps).forEach((key) => {
          if (key) {
            switch (key) {
              case "hOffset":
              case "vOffset":
              case "blur":
              case "spread":
              case "opacity":
                const num = parseFloat(resProps[key]);
                updatedStyles[key] = !isNaN(num) ? num : prevStyles[key];
                break;
              case "color":
                updatedStyles[key] = resProps.color;
                break;
              default:
                break;
            }
          }
        });
      }

      return updatedStyles;
    });
  }, [currentElement, getElement]);

  
  const handleUpdate = (updateKey: string, updateValue: any) => {
    setShadowStyles((prevStyles) => ({
      ...prevStyles,
      [updateKey]: updateValue,
    }));
    let style = {};
    switch (updateKey) {
      case "hOffset":
        style = {
          boxShadow: `${updateValue}px ${shadowStyles.vOffset}px ${shadowStyles.blur}px ${shadowStyles.spread}px ${shadowStyles.color}`,
          opacity: shadowStyles.opacity / 100,
        };
        break;
      case "vOffset":
        style = {
          boxShadow: `${shadowStyles.hOffset}px ${updateValue}px ${shadowStyles.blur}px ${shadowStyles.spread}px ${shadowStyles.color}`,
          opacity: shadowStyles.opacity / 100,
        };
        break;
      case "blur":
        style = {
          boxShadow: `${shadowStyles.hOffset}px ${shadowStyles.vOffset}px ${updateValue}px ${shadowStyles.spread}px ${shadowStyles.color}`,
          opacity: shadowStyles.opacity / 100,
        };
        break;
      case "spread":
        style = {
          boxShadow: `${shadowStyles.hOffset}px ${shadowStyles.vOffset}px ${shadowStyles.blur}px ${updateValue}px ${shadowStyles.color}`,
          opacity: shadowStyles.opacity / 100,
        };
        break;
      case "color":
        style = {
          boxShadow: `${shadowStyles.hOffset}px ${shadowStyles.vOffset}px ${shadowStyles.blur}px ${shadowStyles.spread}px ${updateValue}`,
          opacity: shadowStyles.opacity / 100,
        };
        break;
      case "opacity":
        style = {
          boxShadow: `${shadowStyles.hOffset}px ${shadowStyles.vOffset}px ${shadowStyles.blur}px ${shadowStyles.spread}px ${shadowStyles.color}`,
          opacity: updateValue / 100,
        };
        break;
      default:
        break;
    }

    updateElement(currentElement, style);
  };

  return (
    <div className="py-1 px-6 ">
      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="hOffset"
          className="block mb-1 w-1/3"
        >
          阴影水平偏移：
        </label>
        <input
          id="hOffset"
          type="range"
          min={0}
          max={100}
          value={shadowStyles.hOffset}
          onChange={(e) => handleUpdate("hOffset", parseInt(e.target.value, 10))}
          className="range range-xs w-2/3"
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="vOffset"
          className="block mb-1 w-1/3"
        >
          阴影竖直偏移：
        </label>
        <input
          id="vOffset"
          type="range"
          min={0}
          max={100}
          value={shadowStyles.vOffset}
          onChange={(e) => handleUpdate("vOffset", parseInt(e.target.value, 10))}
          className="range range-xs w-2/3"
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="spread"
          className="block mb-1 w-1/3"
        >
          阴影大小：
        </label>
        <input
          type="number"
          id="spread"
          value={shadowStyles.spread}
          onChange={(e) => handleUpdate("spread", parseInt(e.target.value, 10))}
          placeholder="阴影大小"
          className="input input-bordered w-2/3"
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="blur"
          className="block mb-1 w-1/3"
        >
          阴影模糊：
        </label>
        <input
          type="number"
          id="blur"
          value={shadowStyles.blur}
          onChange={(e) => handleUpdate("blur", parseInt(e.target.value, 10))}
          placeholder="字号大小"
          className="input input-bordered w-2/3"
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="opacity"
          className="block mb-1 w-1/3"
        >
          透明度：
        </label>
        <input
          id="opacity"
          type="range"
          min={0}
          max={100}
          value={shadowStyles.opacity}
          onChange={(e) => handleUpdate("opacity", parseFloat(e.target.value))}
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
        <ColorPicker changeColor={(e) => handleUpdate("color", e)} />
      </div>
    </div>
  );
}

export default ShadowProps;
