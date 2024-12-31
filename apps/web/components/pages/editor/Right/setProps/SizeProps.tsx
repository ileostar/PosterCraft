"use client";

import useProps from "@/hooks/useProps";
import { useMemo } from "react";

interface SizeControl {
  id: string;
  label: string;
  placeholder: string;
}

function SizeProps() {
  const initialState = {
    height: 0,
    width: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  };

  const { elementStyle: sizeStyles, handleUpdate } = useProps(initialState, "sizeProps");

  const controls: SizeControl[] = useMemo(
    () => [
      { id: "height", label: "高度", placeholder: "高度" },
      { id: "width", label: "宽度", placeholder: "宽度" },
      { id: "paddingTop", label: "上边距", placeholder: "上边距" },
      { id: "paddingBottom", label: "下边距", placeholder: "下边距" },
      { id: "paddingLeft", label: "左边距", placeholder: "左边距" },
      { id: "paddingRight", label: "右边距", placeholder: "右边距" },
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
            value={sizeStyles[id]}
            onChange={(e) => handleUpdate(id, parseInt(e.target.value, 10))}
            placeholder={placeholder}
            className="input input-bordered w-2/3 input-sm max-w-xs"
          />
        </div>
      ))}
    </div>
  );
}

export default SizeProps;
