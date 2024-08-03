import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Toggle } from "@/components/ui/toggle";
import { Bold, Italic, Underline } from "lucide-react";
import { useState } from "react";

import ColorPicker from "../../../../base/ColorPicker";

function BorderProps() {
  const [fontSize, setFontSize] = useState<string>("");
  const [fontFamily, setFontFamily] = useState<string>("");
  const [fontStyle, setFontStyle] = useState<string>("");
  const [lineHeight, setLineHeight] = useState<number>(0);

  return (
    <div className="py-1 px-6 ">
      
      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="fontFamily"
          className="block mb-1 w-1/3"
        >
          边框类型：
        </label>
        <select
          id="fontFamily"
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="select select-bordered w-2/3"
        >
          <option
            disabled
            selected
          >
            Who shot first?
          </option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
      </div>

     

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="lineHeight"
          className="block mb-1 w-1/3"
        >
          边框宽度：
        </label>
        <input
          id="lineHeight"
          type="range"
          min={0}
          max={100}
          value={lineHeight}
          onChange={(e) => setLineHeight(parseInt(e.target.value, 10))}
          className="range range-xs w-2/3"
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="lineHeight"
          className="block mb-1 w-1/3"
        >
          边框圆角：
        </label>
        <input
          id="lineHeight"
          type="range"
          min={0}
          max={100}
          value={lineHeight}
          onChange={(e) => setLineHeight(parseInt(e.target.value, 10))}
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
        <ColorPicker />
      </div>

       
    </div>
  );
}

export default BorderProps;
