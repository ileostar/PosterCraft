"use client";

import { Input } from "@/components/ui/input";

import useProps from "../../../../../hooks/useProps";

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
          className="input input-bordered w-2/3 input-sm  max-w-xs"
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
          className="input input-bordered w-2/3 input-sm  max-w-xs"
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
          className="input input-bordered w-2/3 input-sm  max-w-xs"
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
          className="input input-bordered w-2/3 input-sm  max-w-xs"
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
          className="input input-bordered w-2/3 input-sm  max-w-xs"
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
          className="input input-bordered w-2/3 input-sm  max-w-xs"
        />
      </div>
    </div>
  );
}

export default SizeProps;
