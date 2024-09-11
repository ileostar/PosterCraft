"use client";

import ColorPicker from "@/components/shared/ColorPicker";

import useProps from "../../../../../hooks/useProps";

function BorderProps() {
  const initialState = {
    borderStyle: "",
    borderWidth: 0,
    borderRadius: 0,
    borderColor: "",
  };

  const { elementStyle: borderStyles, handleUpdate } = useProps(initialState, "borderProps");

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
          onChange={(e) => handleUpdate("borderStyle", e.target.value)}
          className="select select-bordered w-2/3"
        >
          <option value="none">无边框</option>
          <option value="solid">实线</option>
          <option value="dashed">虚线</option>
          <option value="dotted">点线</option>
          <option value="double">双线</option>
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
          onChange={(e) => handleUpdate("borderWidth", parseInt(e.target.value, 10))}
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
          onChange={(e) => handleUpdate("borderRadius", parseInt(e.target.value, 10))}
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
          toColor={borderStyles.borderColor}
          changeColor={(e) => handleUpdate("borderColor", e)}
        />
      </div>
    </div>
  );
}

export default BorderProps;
