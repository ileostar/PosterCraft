"use client";

import ColorPicker from "@/components/shared/ColorPicker";
import useProps from "@/hooks/useProps";
import { useMemo } from "react";

interface BorderControl {
  id: string;
  label: string;
  type: "select" | "range" | "color";
  min?: number;
  max?: number;
  options?: { value: string; label: string }[];
}

function BorderProps() {
  const initialState = {
    borderStyle: "",
    borderWidth: 0,
    borderRadius: 0,
    borderColor: "",
  };

  const { elementStyle: borderStyles, handleUpdate } = useProps(initialState, "borderProps");

  const controls: BorderControl[] = useMemo(
    () => [
      {
        id: "borderStyle",
        label: "边框类型",
        type: "select",
        options: [
          { value: "none", label: "无边框" },
          { value: "solid", label: "实线" },
          { value: "dashed", label: "虚线" },
          { value: "dotted", label: "点线" },
          { value: "double", label: "双线" },
        ],
      },
      {
        id: "borderWidth",
        label: "边框宽度",
        type: "range",
        min: 0,
        max: 50,
      },
      {
        id: "borderRadius",
        label: "边框圆角",
        type: "range",
        min: 0,
        max: 100,
      },
      {
        id: "borderColor",
        label: "边框颜色",
        type: "color",
      },
    ],
    [],
  );

  const renderControl = (control: BorderControl) => {
    const { id, type, min, max, options } = control;

    switch (type) {
      case "select":
        return (
          <select
            value={String(borderStyles[id])}
            onChange={(e) => handleUpdate(id, e.target.value)}
            className="select select-bordered w-2/3"
          >
            {options?.map(({ value, label }) => (
              <option
                key={value}
                value={value}
              >
                {label}
              </option>
            ))}
          </select>
        );

      case "range":
        return (
          <input
            type="range"
            min={min}
            max={max}
            value={borderStyles[id]}
            onChange={(e) => handleUpdate(id, parseInt(e.target.value, 10))}
            className="range range-xs w-2/3"
          />
        );

      case "color":
        return (
          <ColorPicker
            toColor={String(borderStyles[id])}
            changeColor={(e) => handleUpdate(id, e)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="py-1 px-6">
      {controls.map((control) => (
        <div
          key={control.id}
          className="flex justify-between items-center my-4"
        >
          <label className="block mb-1 w-1/3">{control.label}：</label>
          {renderControl(control)}
        </div>
      ))}
    </div>
  );
}

export default BorderProps;
