import ColorPicker from "@/components/ColorPicker";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Toggle } from "@/components/ui/toggle";
import { Bold, Italic, Underline } from "lucide-react";

import useProps from "../../../../hooks/useProps";

function BaseProps() {
  const initialState = {
    textarea: "",
    fontSize: 0,
    fontFamily: "",
    fontStyle: "",
    fontWeight: "",
    textDecoration: "",
    lineHeight: 0,
    textAlign: "center",
    color: "black",
    backgroundColor: "transparent",
  };

  const { elementStyle: textStyles, handleUpdate } = useProps(initialState, "baseProps");

  return (
    <div className="py-1 px-6 ">
      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="textarea"
          className="block mb-1 w-1/3"
        >
          文本：
        </label>
        <textarea
          id="textarea"
          value={textStyles.textarea}
          className="textarea textarea-bordered w-2/3"
          onChange={(e) => handleUpdate("textarea", e.target.value)}
          placeholder="文本内容"
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="fontSize"
          className="block mb-1 w-1/3"
        >
          字号：
        </label>
        <input
          type="number"
          id="fontSize"
          value={textStyles.fontSize}
          onChange={(e) => handleUpdate("fontSize", parseInt(e.target.value, 10))}
          placeholder="字号大小"
          className="input input-bordered w-2/3 input-sm  max-w-xs"
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="fontFamily"
          className="block mb-1 w-1/3"
        >
          字体：
        </label>
        <select
          id="fontFamily"
          value={textStyles.fontFamily || ""}
          onChange={(e) => handleUpdate("fontFamily", e.target.value)}
          className="select select-bordered w-2/3 select-sm max-w-xs"
        >
          <option>无</option>
          <option>SimSun</option>
          <option>SimHei</option>
          <option>KaiTi</option>
        </select>
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="fontStyle"
          className="block mb-1 w-1/3"
        >
          字样：
        </label>
        <div className="w-2/3">
          <Toggle
            aria-label="Toggle bold"
            onClick={() =>
              handleUpdate("fontWeight", textStyles.fontWeight === "bold" ? "" : "bold")
            }
          >
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle
            aria-label="Toggle italic"
            onClick={() =>
              handleUpdate("fontStyle", textStyles.fontStyle === "italic" ? "" : "italic")
            }
          >
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle
            aria-label="Toggle underline"
            onClick={() =>
              handleUpdate(
                "textDecoration",
                textStyles.textDecoration === "underline" ? "" : "underline",
              )
            }
          >
            <Underline className="h-4 w-4" />
          </Toggle>
        </div>
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="lineHeight"
          className="block mb-1 w-1/3"
        >
          行高：
        </label>
        <input
          type="number"
          id="lineHeight"
          value={textStyles.lineHeight}
          onChange={(e) => handleUpdate("lineHeight", parseInt(e.target.value, 10))}
          placeholder="行高"
          className="input input-bordered w-2/3 input-sm  max-w-xs"
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="radio"
          className="block mb-1 w-1/3"
        >
          对齐：
        </label>
        <RadioGroup
          defaultValue={textStyles.textAlign}
          id="radio"
          onValueChange={(e) => handleUpdate("textAlign", e)}
          className="w-2/3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="left"
              id="left"
            />
            <Label htmlFor="left">左对齐</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="center"
              id="center"
            />
            <Label htmlFor="center">居中对齐</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="right"
              id="right"
            />
            <Label htmlFor="right">右对齐</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="color"
          className="block mb-1 w-1/3"
        >
          文字颜色：
        </label>
        <ColorPicker
          toColor={textStyles.color}
          changeColor={(e) => handleUpdate("color", e)}
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="color"
          className="block mb-1 w-1/3"
        >
          背景颜色：
        </label>
        <ColorPicker
          toColor={textStyles.backgroundColor}
          changeColor={(e) => handleUpdate("backgroundColor", e)}
        />
      </div>
    </div>
  );
}

export default BaseProps;
