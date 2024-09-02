import ColorPicker from "@/components/shared/ColorPicker";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Toggle } from "@/components/ui/toggle";
import { UseElementStore } from "@/stores/element";
import { Bold, Italic, Underline } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

function BaseProps() {
  const { updateElement, currentElement, getElement } = UseElementStore();

  interface TextStyleState {
    textarea: string;
    fontSize: number;
    fontFamily: string;
    fontStyle: string;
    fontWeight: string;
    textDecoration: string;
    lineHeight: number;
    textAlign: string;
    color: string;
    backgroundColor: string;
  }

  const initialState: TextStyleState = {
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

  const [textStyles, setTextStyles] = useState<TextStyleState>(initialState);

  useEffect(() => {
    const res = getElement(currentElement);
    const resProps = res?.props;
    const resText = res?.text;

    setTextStyles((prevStyles) => {
      const updatedStyles = { ...prevStyles };
      if (resProps) {
        Object.keys(resProps).forEach((key) => {
          if (key in prevStyles) {
            switch (key) {
              case "lineHeight":
              case "fontSize":
                const num = parseFloat(resProps[key]);
                updatedStyles[key] = !isNaN(num) ? num : prevStyles[key];
                break;
              case "textAlign":
              case "fontFamily":
              case "fontStyle":
              case "fontWeight":
              case "textDecoration":
              case "color":
              case "backgroundColor":
                updatedStyles[key] = resProps[key];
                break;
            }
          }
        });
      }
      if (resText) {
        updatedStyles.textarea = resText;
      }

      return updatedStyles;
    });
  }, [currentElement, getElement]);

  const handleUpdate = useCallback(
    (updateKey: string, updateValue: any) => {
      setTextStyles((prevStyles) => ({
        ...prevStyles,
        [updateKey]: updateValue,
      }));
      const style = {
        fontSize: updateKey === "fontSize" ? updateValue + "px" : textStyles.fontSize + "px",
        fontFamily: updateKey === "fontFamily" ? updateValue : textStyles.fontFamily,
        fontStyle: updateKey === "fontStyle" ? updateValue : textStyles.fontStyle,
        fontWeight: updateKey === "fontWeight" ? updateValue : textStyles.fontWeight,
        textDecoration: updateKey === "textDecoration" ? updateValue : textStyles.textDecoration,
        lineHeight: updateKey === "lineHeight" ? updateValue + "px" : textStyles.lineHeight + "px",
        textAlign: updateKey === "textAlign" ? updateValue : textStyles.textAlign,
        color: updateKey === "color" ? updateValue : textStyles.color,
        backgroundColor: updateKey === "backgroundColor" ? updateValue : textStyles.backgroundColor,
      };
      updateKey === "textarea"
        ? updateElement(currentElement, style, updateValue)
        : updateElement(currentElement, style, textStyles.textarea);
    },
    [currentElement, textStyles, updateElement],
  );

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
          className="input input-bordered w-2/3"
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
          className="select select-bordered w-2/3"
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
          className="input input-bordered w-2/3"
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
        <ColorPicker changeColor={(e) => handleUpdate("color", e)} />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="color"
          className="block mb-1 w-1/3"
        >
          背景颜色：
        </label>
        <ColorPicker changeColor={(e) => handleUpdate("backgroundColor", e)} />
      </div>
    </div>
  );
}

export default BaseProps;
