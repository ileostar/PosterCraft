import { create } from "zustand";

type ElementStore = {
  Elements: ElementData[];
  setELements: (elements: ElementData[]) => void;
  // 当前选中的元素
  currentElement: string;
  addElement: (element: ElementData) => void;
  deleteElement: (id: string) => void;
  updateElement: (
    id: string,
    props?: any,
    text?: string,
    url?: string,
    isHidden?: boolean,
    isLocked?: boolean,
    layerName?: string,
    mode?: string,
  ) => void;
  setCurrentElement: (id: string) => void;
  getElement: (id: string) => any;
  isElement: boolean;
  setIsElement: (isElement: boolean) => void;
  currentPosition: { left: any; top: any };
  setCurrentPosition: (left: any, top: any) => void;
  currentSize: { height: any; width: any };
  setCurrentSize: (height: any, width: any) => void;
  isCurrentLocked: boolean;
  setIsCurrentLocked: (mode: boolean) => void;
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
  // 图层是否隐藏
  isHidden?: boolean;
  // 图层是否锁定
  isLocked?: boolean;
  // 图层名称
  layerName?: string;
};

export const UseElementStore = create<ElementStore>((set, get) => ({
  Elements: [],
  setELements: (elements: ElementData[]) => {
    set({ Elements: elements });
  },
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
  updateElement: (
    id: string,
    props: any = {},
    text?: string,
    url?: string,
    isHidden?: boolean,
    isLocked?: boolean,
    layerName?: string,
  ) =>
    set((state) => {
      const newState = state.Elements.map((item) => {
        if (item.id === id) {
          return {
            props: { ...item.props, ...props },
            id: item.id,
            type: item.type,
            text: text ?? item.text,
            url: url ?? item.url,
            isHidden: isHidden ?? item.isHidden,
            isLocked: isLocked ?? item.isLocked,
            layerName: layerName ?? item.layerName,
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
    const element = get().getElement(elementId);
    if (element) {
      get().setIsCurrentLocked(element.isLocked);
    }
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
  // 判断当前元素属性是否被锁定
  setIsCurrentLocked: (isCurrentLocked: boolean) => set((state) => ({ isCurrentLocked })),
  isCurrentLocked: false,
}));
