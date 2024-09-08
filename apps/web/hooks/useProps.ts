import { UseElementStore } from "@/stores/element";
import { useCallback, useEffect, useState } from "react";

type StyleType =
  | "baseProps"
  | "eventProps"
  | "positionProps"
  | "shadowProps"
  | "borderProps"
  | "sizeProps";

const useProps = (initialState: any, styleType: StyleType) => {
  const { updateElement, currentElement, getElement } = UseElementStore();
  const [elementStyle, setElementStyle] = useState(initialState);

  const reset = useCallback(() => {
    for (const key in initialState) {
      elementStyle[key] = initialState[key];
    }
  }, [initialState]);

  useEffect(() => {
    reset();
    const res = getElement(currentElement);
    const resProps = res?.props;
    const resText = res?.text;
    setElementStyle((prevStyles: any) => {
      const updatedStyles = { ...prevStyles };
      if (resProps) {
        Object.keys(resProps).forEach((key) => {
          if (key in prevStyles) {
            if (typeof initialState[key] === "number") {
              const num = parseFloat(resProps[key]);
              updatedStyles[key] = !isNaN(num) ? num : prevStyles[key];
            } else {
              updatedStyles[key] = resProps[key];
            }
          }
        });
      }

      if (styleType === "baseProps" && resText) {
        updatedStyles.textarea = resText;
      }

      return updatedStyles;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentElement, getElement]);

  const handleUpdate = useCallback(
    (updateKey: string, updateValue: any) => {
      setElementStyle((prevStyles: any) => ({
        ...prevStyles,
        [updateKey]: updateValue,
      }));

      let style: { [key: string]: any } = {};
      for (const key in initialState) {
        if (typeof initialState[key] === "number") {
          style[key] = updateKey === key ? `${updateValue}px` : `${elementStyle[key]}px`;
        } else {
          style[key] = updateKey === key ? updateValue : elementStyle[key];
        }
      }

      if (updateKey === "textarea") {
        updateElement(currentElement, style, updateValue);
      } else {
        updateElement(currentElement, style);
      }
    },
    [currentElement, updateElement, elementStyle, initialState],
  );

  return { elementStyle, setElementStyle, handleUpdate };
};

export default useProps;
