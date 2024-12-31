"use client";

import ColorPicker from "@/components/shared/ColorPicker";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Toggle } from "@/components/ui/toggle";
import useProps from "@/hooks/useProps";
import { Bold, Italic, Underline } from "lucide-react";
import { useMemo } from "react";

interface TextControl {
  id: string;
  label: string;
  type: "text" | "number" | "select" | "radio" | "color" | "toggle";
  options?: { value: string; label: string }[];
  toggles?: { icon: React.ReactNode; key: string; value: string }[];
}

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

  const textControls: TextControl[] = useMemo(
    () => [
      {
        id: "text",
        label: "文本",
        type: "text",
      },
      {
        id: "fontSize",
        label: "字号",
        type: "number",
      },
      {
        id: "fontFamily",
        label: "字体",
        type: "select",
        options: [
          { value: "", label: "无" },
          { value: "SimSun", label: "SimSun" },
          { value: "SimHei", label: "SimHei" },
          { value: "KaiTi", label: "KaiTi" },
        ],
      },
      {
        id: "fontStyle",
        label: "字样",
        type: "toggle",
        toggles: [
          { icon: <Bold className="h-4 w-4" />, key: "fontWeight", value: "bold" },
          { icon: <Italic className="h-4 w-4" />, key: "fontStyle", value: "italic" },
          { icon: <Underline className="h-4 w-4" />, key: "textDecoration", value: "underline" },
        ],
      },
      {
        id: "lineHeight",
        label: "行高",
        type: "number",
      },
      {
        id: "textAlign",
        label: "对齐",
        type: "radio",
        options: [
          { value: "left", label: "左对齐" },
          { value: "center", label: "居中对齐" },
          { value: "right", label: "右对齐" },
        ],
      },
      {
        id: "color",
        label: "文字颜色",
        type: "color",
      },
      {
        id: "backgroundColor",
        label: "背景颜色",
        type: "color",
      },
    ],
    [],
  );

  const renderControl = (control: TextControl) => {
    const { id, label, type, options, toggles } = control;

    const commonProps = {
      className: "w-2/3",
      value: String(textStyles[id]),
      onChange: (e: any) => handleUpdate(id, e.target?.value ?? e),
    };

    switch (type) {
      case "text":
        return (
          <textarea
            {...commonProps}
            className="textarea textarea-bordered w-2/3"
            placeholder="文本内容"
          />
        );

      case "number":
        return (
          <input
            type="number"
            {...commonProps}
            className="input input-bordered w-2/3 input-sm max-w-xs"
            placeholder={label}
          />
        );

      case "select":
        return (
          <select
            {...commonProps}
            className="select select-bordered w-2/3 select-sm max-w-xs"
          >
            {options?.map(({ value, label }) => (
              <option
                key={value}
                value={value}
              >
                {label}
              </option>
            ))}
          </select>
        );

      case "toggle":
        return (
          <div className="w-2/3">
            {toggles?.map(({ icon, key, value }) => (
              <Toggle
                key={key}
                aria-label={`Toggle ${key}`}
                onClick={() => handleUpdate(key, textStyles[key] === value ? "" : value)}
              >
                {icon}
              </Toggle>
            ))}
          </div>
        );

      case "radio":
        return (
          <RadioGroup
            {...commonProps}
            onValueChange={(e) => handleUpdate(id, e)}
            defaultValue={String(textStyles[id])}
          >
            {options?.map(({ value, label }) => (
              <div
                key={value}
                className="flex items-center space-x-2"
              >
                <RadioGroupItem
                  value={value}
                  id={value}
                />
                <Label htmlFor={value}>{label}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "color":
        return (
          <ColorPicker
            toColor={String(textStyles[id])}
            changeColor={(e) => handleUpdate(id, e)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="py-1 px-6">
      {textControls.map((control) => (
        <div
          key={control.id}
          className="flex justify-between items-center my-4"
        >
          <label
            htmlFor={control.id}
            className="block mb-1 w-1/3"
          >
            {control.label}：
          </label>
          {renderControl(control)}
        </div>
      ))}
    </div>
  );
}

export default BaseProps;
