import { useEditorStore } from "@/stores/editor";
import { AllComponentProps } from "@poster-craft/bricks";
import { useCallback, useEffect, useRef } from "react";

type StyleType =
  | "baseProps"
  | "eventProps"
  | "positionProps"
  | "shadowProps"
  | "borderProps"
  | "sizeProps";

interface StyleState {
  [key: string]: string | number;
}

const useProps = (initialState: StyleState, styleType: StyleType) => {
  const { updateComponent, currentElement, getElement } = useEditorStore();
  const styleRef = useRef<StyleState>(initialState);

  // 重置样式状态
  const reset = useCallback(() => {
    styleRef.current = initialState;
  }, [initialState]);

  // 监听当前元素变化，更新样式
  useEffect(() => {
    reset();
    const element = getElement(currentElement);
    if (!element) return;

    const { props: elementProps } = element;

    // 更新属性值
    Object.keys(styleRef.current).forEach((key) => {
      if (key in elementProps) {
        if (typeof initialState[key] === "number") {
          const value = parseFloat(elementProps[key]);
          styleRef.current[key] = !isNaN(value) ? value : styleRef.current[key];
        } else {
          styleRef.current[key] = elementProps[key];
        }
      }
    });

    // 处理文本内容
    if (styleType === "baseProps" && elementProps.text) {
      styleRef.current.textarea = elementProps.text;
    }
  }, [currentElement, getElement, initialState, styleType, reset]);

  // 处理样式更新
  const handleUpdate = useCallback(
    (key: string, value: string | number) => {
      // 更新本地状态
      styleRef.current[key] = value;

      // 处理普通样式更新
      const formattedValue = typeof value === "number" ? `${value}px` : value;
      updateComponent({
        key: key as keyof AllComponentProps,
        value: formattedValue,
        id: currentElement,
      });
    },
    [currentElement, updateComponent],
  );

  return {
    elementStyle: styleRef.current,
    setElementStyle: (value: StyleState) => {
      styleRef.current = value;
    },
    handleUpdate,
  };
};

export default useProps;
