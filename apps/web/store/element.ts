import { create } from "zustand";

type ElementStore = {
  Elements: ElementData[];
  // 当前选中的元素
  currentElement: string;
  addElement: (element: ElementData) => void;
  deleteElement: (id: string) => void;
  updateElement: (id: string, props?: any, text?: string, url?: string) => void;
  setCurrentElement: (id: string) => void;
  getElement: (id: string) => any;
  isElement: boolean;
  setIsElement: (isElement: boolean) => void;
  currentPosition: { left: any; top: any };
  setCurrentPosition: (left: any, top: any) => void;
  currentSize: { height: any; width: any };
  setCurrentSize: (height: any, width: any) => void;
  mode: boolean;
  setMode: (mode: boolean) => void;
};

type ElementData = {
  // 元素样式属性
  props: { [key: string]: any };
  // 元素id
  id: string;
  // 元素类型：text,img,graph
  type: "text" | "img" | "graph";
  // 可选的text属性，类型为string或null
  text?: string | null;
  //跳转url
  url?: string;
};

export const UseElementStore = create<ElementStore>((set, get) => ({
  Elements: [],
  currentElement: "",
  // 添加元素
  addElement: (element: ElementData) =>
    set((state) => ({ Elements: [...state.Elements, element] })),
  // 删除元素
  deleteElement: (id: string) =>
    set((state) => {
      const newState = state.Elements.filter((item) => item.id !== id);
      return { Elements: newState };
    }),
  // 更新元素
  updateElement: (id: string, props?: any, text?: string, url?: string) =>
    set((state) => {
      const newState = state.Elements.map((item) => {
        if (item.id === id) {
          return {
            props: { ...item.props, ...props } || item.props,
            id: item.id,
            type: item.type,
            text: text || item.text,
            url: url || item.url,
          };
        }
        return item;
      });
      return { Elements: newState };
    }),
  // 获取元素
  getElement: (id: string) => {
    const state = get();
    const element = state.Elements.find((item) => item.id === id);
    return element;
  },
  // 当前选中的元素
  setCurrentElement: (elementId: string) => {
    set((state) => ({ currentElement: elementId }));
  },
  // 判断当前点击的是否是元素(1.背景 2.元素)
  setIsElement: (isElement: boolean) => set((state) => ({ isElement })),
  isElement: false,
  // 当拖动移动元素时，用于是否更新元素位置数据面板的判断
  currentPosition: { left: 0, top: 0 },
  setCurrentPosition: (left: any, top: any) => set((state) => ({ currentPosition: { left, top } })),
  // 当拖动缩放元素时，用于是否更新元素尺寸数据面板的判断
  currentSize: { height: 0, width: 0 },
  setCurrentSize: (height: any, width: any) => set((state) => ({ currentSize: { height, width } })),
  // 判断当前拖动动作是移动元素位置还是缩放元素尺寸,
  setMode: (mode: boolean) => set((state) => ({ mode })),
  mode: true,
}));
