"use client";

import { UseElementStore } from "@/stores/element";
import { useCallback, useEffect, useState } from "react";

function PositionProps() {
  const { updateElement, currentElement, getElement, currentPosition, currentSize } =
    UseElementStore();

  interface PositionStyleState {
    left: number;
    top: number;
  }

  const initialState: PositionStyleState = {
    top: 0,
    left: 0,
  };

  const [positionStyles, setPositionStyles] = useState<PositionStyleState>(initialState);

  useEffect(() => {
    const res = getElement(currentElement);
    const resProps = res?.props;

    setPositionStyles((prevStyles) => {
      const updatedStyles = { ...prevStyles };
      if (resProps) {
        Object.keys(resProps).forEach((key) => {
          if (prevStyles.hasOwnProperty(key)) {
            if (key === "top") {
              const num = parseFloat(resProps.top);
              if (!isNaN(num)) {
                updatedStyles[key] = num;
              }
            } else if (key === "left") {
              const num = parseFloat(resProps.left);
              if (!isNaN(num)) {
                updatedStyles[key] = num;
              }
            }
          }
        });
      }

      return updatedStyles;
    });
  }, [currentElement, getElement, currentPosition, currentSize]);

  const handleUpdate = useCallback(
    (updateKey: string, updateValue: any) => {
      setPositionStyles((prevStyles) => ({
        ...prevStyles,
        [updateKey]: updateValue,
      }));
      const style = {
        left: updateKey === "left" ? updateValue + "px" : positionStyles.left + "px",
        top: updateKey === "top" ? updateValue + "px" : positionStyles.top + "px",
      };
      updateElement(currentElement, style);
    },
    [currentElement, positionStyles, updateElement],
  );

  return (
    <div className="py-1 px-6 ">
      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="left"
          className="block mb-1 w-1/3"
        >
          X轴坐标：
        </label>
        <input
          type="number"
          id="left"
          value={positionStyles.left}
          onChange={(e) => handleUpdate("left", parseInt(e.target.value, 10))}
          placeholder="x轴坐标"
          className="input input-bordered w-2/3"
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="top"
          className="block mb-1 w-1/3"
        >
          y轴坐标：
        </label>
        <input
          type="number"
          id="top"
          value={positionStyles.top}
          onChange={(e) => handleUpdate("top", parseInt(e.target.value, 10))}
          placeholder="y轴坐标"
          className="input input-bordered w-2/3"
        />
      </div>
    </div>
  );
}

export default PositionProps;
