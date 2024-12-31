"use client";

import useProps from "@/hooks/useProps";
import { useMemo } from "react";

interface PositionControl {
  id: string;
  label: string;
  placeholder: string;
}

function PositionProps() {
  const initialState = {
    top: 0,
    left: 0,
  };

  const { elementStyle: positionStyles, handleUpdate } = useProps(initialState, "positionProps");

  const controls: PositionControl[] = useMemo(
    () => [
      { id: "left", label: "X轴坐标", placeholder: "x轴坐标" },
      { id: "top", label: "Y轴坐标", placeholder: "y轴坐标" },
    ],
    [],
  );

  return (
    <div className="py-1 px-6">
      {controls.map(({ id, label, placeholder }) => (
        <div
          key={id}
          className="flex justify-between items-center my-4"
        >
          <label className="block mb-1 w-1/3">{label}：</label>
          <input
            type="number"
            value={positionStyles[id]}
            onChange={(e) => handleUpdate(id, parseInt(e.target.value, 10))}
            placeholder={placeholder}
            className="input input-bordered w-2/3 input-sm max-w-xs"
          />
        </div>
      ))}
    </div>
  );
}

export default PositionProps;
