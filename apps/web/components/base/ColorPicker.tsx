import React, { useState } from "react";
import { SketchPicker } from "react-color";

const ColorPicker = ({changeColor}:{changeColor:(value: string) => void;}) => {
  const [color, setColor] = useState("#000000");

  const handleChangeComplete = (color: any) => {
    console.log(color);
    // console.log(color.hex);
    // setColor(color.hex);
    changeColor(color.hex);
  };

  return (
    <div className="w-2/3">
      <SketchPicker
       className="w-full"
        color={color}
        onChangeComplete={handleChangeComplete}
      />
    </div>
  );
};

export default ColorPicker;
