"use client";

import React, { useEffect, useState } from "react";
import { TwitterPicker } from "react-color";

const ColorPicker = ({
  changeColor,
  toColor,
}: {
  changeColor: (value: string) => void;
  toColor: string;
}) => {
  const [color, setColor] = useState("#000000");

  const handleChangeComplete = (color: any) => {
    console.log(color);
    setColor(color.hex);
    changeColor(color.hex);
  };

  useEffect(() => {
    setColor(toColor);
  }, [toColor]);

  return (
    <div className="w-2/3">
      <TwitterPicker
        width="100%"
        color={color}
        onChangeComplete={handleChangeComplete}
      />
    </div>
  );
};

export default ColorPicker;
