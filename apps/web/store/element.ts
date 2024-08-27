import { ElementDataType, ElementStoreType } from "@/types/ElementType";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

export type MoveDirection = 'Up' | 'Down' | 'Left' | 'Right'

interface ElementStore extends ElementStoreType {
  //设置整个元素列表
  setELements: (elements: ElementData[]) => void;
  // 添加元素
  addElement: (element: ElementData) => void;
  // 删除元素
  deleteElement: (id: string) => void;
  // 更新元素
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
  // 设置当前选中的元素
  setCurrentElement: (id: string) => void;
  // 根据id获取元素
  getElement: (id: string) => any;
  // 判断当前点击的是否是元素(1.背景 2.元素)
  isElement: boolean;
  setIsElement: (isElement: boolean) => void;
  // 当拖动移动元素时，用于是否更新元素位置数据面板的判断
  currentPosition: { left: any; top: any };
  setCurrentPosition: (left: any, top: any) => void;
  // 当拖动缩放元素时，用于是否更新元素尺寸数据面板的判断
  currentSize: { height: any; width: any };
  setCurrentSize: (height: any, width: any) => void;
  // 判断当前元素属性是否被锁定
  isCurrentLocked: boolean;
  setIsCurrentLocked: (mode: boolean) => void;
  // 设置页面背景样式
  setPageBackgroundStyle: (style: { [key: string]: string }) => void;
  // 复制元素
  copiedComponent: ElementDataType | null;
  setCopyComponent: (id: string) => void;
  // 粘贴元素
  setPastedComponent: () => void;
  // 移动元素
  setMoveComponent: (id: string,direction:MoveDirection,amount:number) => void;
}

interface ElementData extends ElementDataType {}

export const UseElementStore = create<ElementStore>((set, get) => ({
  Elements: [],
  //设置整个元素列表
  setELements: (elements: ElementData[]) => {
    set({ Elements: elements });
  },
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
  currentElement: "",
  // 设置当前选中的元素
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

  // 页面背景默认样式
  pageBackgroundStyle: {
    backgroundColor: "",
    backgroundImage: ``,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  setPageBackgroundStyle: (style: {}) => set((state) => ({ pageBackgroundStyle: style })),
  //复制元素
  copiedComponent: null,
  setCopyComponent: (id: string) => {
    set((state) => ({ copiedComponent: state.getElement(id) }));
    console.log("待定");
  },
  //粘贴元素
  setPastedComponent: () => {
    if (get().copiedComponent) {
      const element = {
        ...get().copiedComponent!,
        id: uuidv4(),
        layerName: get().copiedComponent!.layerName + "副本",
      };
      console.log("待定");
      get().addElement(element);
    }
  },
  //移动元素
  setMoveComponent:(id:string,direction:MoveDirection,amount:number)=>{
    const element = get().getElement(id);
    if (element) {
      switch (direction) {
        case "Left":
          get().updateElement(id, { left: parseInt(element.props.left.replace('px', ''),10) - amount+'px' });
          break;
        case "Right":
          get().updateElement(id, { left: parseInt(element.props.left.replace('px', ''),10) + amount+'px' });
          break;
        case "Up":
          get().updateElement(id, { top: parseInt(element.props.top.replace('px', ''),10) - amount+'px' });
          break;
        case "Down":
          get().updateElement(id, { top: parseInt(element.props.top.replace('px', ''),10) + amount+'px' });
          break;
      }
    }
  }
}));
