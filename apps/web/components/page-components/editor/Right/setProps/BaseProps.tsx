import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Toggle } from "@/components/ui/toggle";
import { UseElementStore } from "@/store/element";
import { Bold, Italic, Underline } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import ColorPicker from "../../../../base/ColorPicker";

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

  const [textStyles, setTextStyles] = useState<TextStyleState>(initialState);

  const reset = () => {
    (textStyles.textarea = ""),
      (textStyles.fontSize = 0),
      (textStyles.fontFamily = ""),
      (textStyles.fontStyle = ""),
      (textStyles.fontWeight = ""),
      (textStyles.textDecoration = ""),
      (textStyles.lineHeight = 0),
      (textStyles.textAlign = "center"),
      (textStyles.color = "black"),
      (textStyles.backgroundColor = "transparent");
  };

  useEffect(() => {
    reset()
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

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // 更新ref，表示这不是第一次渲染
      return; // 跳过后续的逻辑
    }
    const style = {
      fontSize: textStyles.fontSize + "px",
      fontFamily: textStyles.fontFamily,
      fontStyle: textStyles.fontStyle,
      fontWeight: textStyles.fontWeight,
      textDecoration: textStyles.textDecoration,
      lineHeight: textStyles.lineHeight + "px",
      textAlign: textStyles.textAlign,
      color: textStyles.color,
      backgroundColor: textStyles.backgroundColor,
    };
    updateElement(currentElement, style, textStyles.textarea);
  }, [textStyles, currentElement, updateElement]);

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
          onChange={(e) =>
            setTextStyles((prevStyles) => ({
              ...prevStyles,
              textarea: e.target.value,
            }))
          }
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
          onChange={(e) =>
            setTextStyles((prevStyles) => ({
              ...prevStyles,
              fontSize: parseInt(e.target.value, 10),
            }))
          }
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
          onChange={(e) =>
            setTextStyles((prevStyles) => ({
              ...prevStyles,
              fontFamily: e.target.value,
            }))
          }
          className="select select-bordered w-2/3"
        >
          <option>无</option>
          <option>SimSun</option>
          <option>imHei</option>
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
              setTextStyles((prevStyles) => ({
                ...prevStyles,
                fontWeight: prevStyles.fontWeight === "bold" ? "" : "bold",
              }))
            }
          >
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle
            aria-label="Toggle italic"
            onClick={() =>
              setTextStyles((prevStyles) => ({
                ...prevStyles,
                fontStyle: prevStyles.fontStyle === "italic" ? "" : "italic",
              }))
            }
          >
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle
            aria-label="Toggle underline"
            onClick={() =>
              setTextStyles((prevStyles) => ({
                ...prevStyles,
                textDecoration: prevStyles.textDecoration === "underline" ? "" : "underline",
              }))
            }
          >
            <Underline className="h-4 w-4" />
          </Toggle>
        </div>
      </div>

      {/* <div className="flex justify-between items-center my-4">
        <label
          htmlFor="lineHeight"
          className="block mb-1 w-1/3"
        >
          行高：
        </label>
        <input
          id="lineHeight"
          type="range"
          min={0}
          max={100}
          value={textStyles.lineHeight}
          onChange={(e) => setTextStyles(prevStyles => ({
            ...prevStyles,
            lineHeight:parseInt(e.target.value, 10)
          }))}
          className="range range-xs w-2/3"
        />
      </div> */}

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
          onChange={(e) =>
            setTextStyles((prevStyles) => ({
              ...prevStyles,
              lineHeight: parseInt(e.target.value, 10),
            }))
          }
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
          onValueChange={(e) => {
            setTextStyles((prevStyles) => ({
              ...prevStyles,
              textAlign: e,
            }));
          }}
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
          changeColor={(e) =>
            setTextStyles((prevStyles) => ({
              ...prevStyles,
              color: e,
            }))
          }
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
          changeColor={(e) =>
            setTextStyles((prevStyles) => ({
              ...prevStyles,
              backgroundColor: e,
            }))
          }
        />
      </div>
    </div>
  );
}

export default BaseProps;
