"use client";

import ColorPicker from "@/components/shared/ColorPicker";
import useProps from "@/hooks/useProps";
import { useMemo } from "react";

interface ShadowControl {
  id: string;
  label: string;
  type: "range" | "number" | "color";
  min?: number;
  max?: number;
  placeholder?: string;
}

function ShadowProps() {
  const initialState = {
    hOffset: 0,
    vOffset: 0,
    blur: 0,
    spread: 0,
    color: "red",
    opacity: 100,
  };

  const { elementStyle: shadowStyles, handleUpdate } = useProps(initialState, "shadowProps");

  const controls: ShadowControl[] = useMemo(
    () => [
      {
        id: "hOffset",
        label: "阴影水平偏移",
        type: "range",
        min: 0,
        max: 100,
      },
      {
        id: "vOffset",
        label: "阴影竖直偏移",
        type: "range",
        min: 0,
        max: 100,
      },
      {
        id: "spread",
        label: "阴影大小",
        type: "number",
        placeholder: "阴影大小",
      },
      {
        id: "blur",
        label: "阴影模糊",
        type: "number",
        placeholder: "阴影模糊",
      },
      {
        id: "opacity",
        label: "透明度",
        type: "range",
        min: 0,
        max: 100,
      },
      {
        id: "color",
        label: "阴影颜色",
        type: "color",
      },
    ],
    [],
  );

  const renderControl = (control: ShadowControl) => {
    const { id, type, min, max, placeholder } = control;

    switch (type) {
      case "range":
        return (
          <input
            type="range"
            min={min}
            max={max}
            value={shadowStyles[id]}
            onChange={(e) => handleUpdate(id, parseInt(e.target.value, 10))}
            className="range range-xs w-2/3"
          />
        );

      case "number":
        return (
          <input
            type="number"
            value={shadowStyles[id]}
            onChange={(e) => handleUpdate(id, parseInt(e.target.value, 10))}
            placeholder={placeholder}
            className="input input-bordered w-2/3 input-sm max-w-xs"
          />
        );

      case "color":
        return (
          <ColorPicker
            toColor={String(shadowStyles[id])}
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

export default ShadowProps;
