"use client";

import useProps from "../../../../../hooks/useProps";

function PositionProps() {
  const initialState = {
    top: 0,
    left: 0,
  };

  const { elementStyle: positionStyles, handleUpdate } = useProps(initialState, "positionProps");

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
          className="input input-bordered w-2/3 input-sm  max-w-xs"
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
          className="input input-bordered w-2/3 input-sm  max-w-xs"
        />
      </div>
    </div>
  );
}

export default PositionProps;
