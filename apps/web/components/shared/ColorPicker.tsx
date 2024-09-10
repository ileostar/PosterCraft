"use client";

import React, { useState } from "react";
import { BlockPicker } from "react-color";

const ColorPicker = ({ changeColor }: { changeColor: (value: string) => void }) => {
  const [color, setColor] = useState("#000000");

  const handleChangeComplete = (color: any) => {
    console.log(color);
    setColor(color.hex);
    changeColor(color.hex);
  };

  return (
    <div className="w-2/3">
      <BlockPicker
        width="100%"
        color={color}
        onChangeComplete={handleChangeComplete}
      />
    </div>
  );
};

export default ColorPicker;
