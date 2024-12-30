import { useEditorStore } from "@/stores/editor";
import { useEffect, useState } from "react";

export default function useProps(initialState: any, type: string) {
  const [elementStyle, setElementStyle] = useState(initialState);
  const { currentElement, components, updateComponent } = useEditorStore();

  useEffect(() => {
    if (!currentElement) {
      setElementStyle(initialState);
      return;
    }

    const component = components.find((comp) => comp.id === currentElement);
    if (!component) return;

    const currentStyles = Object.keys(initialState).reduce((acc, key) => {
      const value = component.props[key];
      if (value) {
        acc[key] = parseInt(value.replace("px", ""));
      }
      return acc;
    }, {} as any);

    setElementStyle({ ...initialState, ...currentStyles });
  }, [currentElement, components]);

  const handleUpdate = (key: string, value: any) => {
    setElementStyle((prev: any) => ({ ...prev, [key]: value }));
    updateComponent({
      key,
      value: `${value}px`,
      id: currentElement,
      isRoot: true,
    });
  };

  return {
    elementStyle,
    setElementStyle,
    handleUpdate,
  };
}
