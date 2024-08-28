import { ElementDataType, ElementStoreType } from "@/types/ElementType";
import { debounceChange, insertAt } from "@/utils/helper";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

type MoveDirection = "Up" | "Down" | "Left" | "Right";

//操作历史记录
interface HistoryProps {
  id: string;
  // 元素id
  elementId: string;
  //操作类型
  type: "add" | "delete" | "update";
  //修改的元素数据
  data: any;
  //修改元素在数组的位置
  index?: number;
}

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
  copiedElement: ElementDataType | null;
  setCopyElement: (id: string) => void;
  // 粘贴元素
  setPastedElement: () => void;
  // 移动元素
  setMoveElement: (id: string, direction: MoveDirection, amount: number) => void;
  // 当前操作的历史记录
  histories: HistoryProps[];
  // 当前历史记录的操作位置
  historyIndex: number;
  // 开始更新时的缓存值
  cachedOldValues: any;
  // 保存最多历史条目记录数
  maxHistoryNumber: number;
  // 添加历史记录
  pushHistory: (historyRecord: HistoryProps) => void;
  // 修改的历史记录
  modifyHistory: (history: HistoryProps, type: "undo" | "redo") => void;
  // 添加修改的历史记录
  pushModifyHistory: (id: string, oldValue: any, newValue: any) => void;
  //给函数增加防抖
  pushHistoryDebounce: (id: string, oldValue: any, newValue: any) => void;
  // 撤销操作
  undo: () => void;
  // 恢复操作
  redo: () => void;
}

interface ElementData extends ElementDataType {}

export const UseElementStore = create<ElementStore>((set, get) => ({
  Elements: [],
  //设置整个元素列表
  setELements: (elements: ElementData[]) => {
    set({ Elements: elements });
  },
  // 添加元素
  addElement: (element: ElementData) => {
    set((state) => ({ Elements: [...state.Elements, element] }));
    console.log("待定");
    get().pushHistory({
      id: uuidv4(),
      elementId: element.id,
      type: "add",
      data: element,
    });
  },
  // 删除元素
  deleteElement: (id: string) => {
    get().pushHistory({
      id: uuidv4(),
      elementId: id,
      type: "delete",
      data: get().Elements.find((item) => item.id === id),
      index: get().Elements.findIndex((item) => item.id === id),
    });
    get().currentElement = "";
    set((state) => {
      const newState = state.Elements.filter((item) => item.id !== id);
      return { Elements: newState };
    });
    console.log("待定");
  },
  // 更新元素
  updateElement: (
    id: string,
    props: any = {},
    text?: string,
    url?: string,
    isHidden?: boolean,
    isLocked?: boolean,
    layerName?: string,
  ) => {
    let oldValue = {};
    let newValue = {};
    set((state) => {
      const newState = state.Elements.map((item) => {
        if (item.id === id) {
          oldValue = { props: { ...item.props }, text: item.text, url: item.url };
          newValue = {
            props: { ...item.props, ...props },
            text: text ?? item.text,
            url: url ?? item.url,
          };
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
    });

    if (!get().cachedOldValues) {
      get().cachedOldValues = oldValue;
    }

    if (layerName === undefined && isLocked == undefined && isHidden == undefined) {
      get().pushHistoryDebounce(id, get().cachedOldValues, newValue);
    }
  },
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
  copiedElement: null,
  setCopyElement: (id: string) => {
    set((state) => ({ copiedElement: state.getElement(id) }));
    console.log("待定");
  },
  //粘贴元素
  setPastedElement: () => {
    if (get().copiedElement) {
      const element = {
        ...get().copiedElement!,
        id: uuidv4(),
        layerName: get().copiedElement!.layerName + "副本",
      };
      get().addElement(element);
      console.log("待定");
      get().pushHistory({
        id: uuidv4(),
        elementId: element.id,
        type: "add",
        data: element,
      });
    }
  },
  //移动元素
  setMoveElement: (id: string, direction: MoveDirection, amount: number) => {
    const element = get().getElement(id);
    if (element) {
      switch (direction) {
        case "Left":
          get().updateElement(id, {
            left: parseInt(element.props.left.replace("px", ""), 10) - amount + "px",
          });
          break;
        case "Right":
          get().updateElement(id, {
            left: parseInt(element.props.left.replace("px", ""), 10) + amount + "px",
          });
          break;
        case "Up":
          get().updateElement(id, {
            top: parseInt(element.props.top.replace("px", ""), 10) - amount + "px",
          });
          break;
        case "Down":
          get().updateElement(id, {
            top: parseInt(element.props.top.replace("px", ""), 10) + amount + "px",
          });
          break;
      }
    }
  },
  // 当前操作的历史记录
  histories: [],
  // 当前历史记录的操作位置
  historyIndex: -1,
  // 开始更新时的缓存值
  cachedOldValues: null,
  // 保存最多历史条目记录数
  maxHistoryNumber: 10,
  // 保存历史记录
  pushHistory: (historyRecord: HistoryProps) => {
    if (get().historyIndex !== -1) {
      get().histories = get().histories.slice(0, get().historyIndex);
      get().historyIndex = -1;
    }
    if (get().histories.length < get().maxHistoryNumber) {
      get().histories.push(historyRecord);
    } else {
      get().histories.shift();
      get().histories.push(historyRecord);
    }
  },
  // 修改历史记录
  modifyHistory: (history: HistoryProps, type: "undo" | "redo") => {
    const { elementId, data } = history;
    const { oldValue, newValue } = data;
    set((state) => {
      const newState = state.Elements.map((item) => {
        if (item.id === elementId) {
          return {
            props: type === "undo" ? { ...oldValue["props"] } : { ...newValue["props"] },
            id: item.id,
            type: item.type,
            text: type === "undo" ? oldValue["text"] : newValue["text"],
            url: type === "undo" ? oldValue["url"] : newValue["url"],
            isHidden: item.isHidden,
            isLocked: item.isLocked,
            layerName: item.layerName,
          };
        }
        return item;
      });
      return { Elements: newState };
    });
  },
  //保存所修改的历史记录
  pushModifyHistory: (id: string, oldValue: any, newValue: any) => {
    get().pushHistory({
      id: uuidv4(),
      elementId: id,
      type: "update",
      data: { oldValue, newValue },
    });
    get().cachedOldValues = null;
  },
  //给函数增加防抖
  pushHistoryDebounce: debounceChange((id: string, oldValue: any, newValue: any) => {
    get().pushModifyHistory(id, oldValue, newValue);
  }),
  //撤销操作
  undo: () => {
    if (get().historyIndex === -1) {
      get().historyIndex = get().histories.length - 1;
    } else {
      get().historyIndex--;
    }
    const history = get().histories[get().historyIndex];
    switch (history.type) {
      case "add":
        get().Elements = get().Elements.filter((element) => element.id !== history.elementId);
        break;
      case "delete":
        get().Elements = insertAt(get().Elements, history.index as number, history.data);
        break;
      case "update":
        get().modifyHistory(history, "undo");
        break;
      default:
        break;
    }
  },
  //恢复操作
  redo: () => {
    if (get().historyIndex === -1) {
      return;
    }
    const history = get().histories[get().historyIndex];
    switch (history.type) {
      case "add":
        get().Elements.push(history.data);
        // get().Elements = insertAt(get().Elements, history.index as number, history.data)
        break;
      case "delete":
        get().Elements = get().Elements.filter((element) => element.id !== history.elementId);
        break;
      case "update":
        get().modifyHistory(history, "redo");
        break;
      default:
        break;
    }
    get().historyIndex++;
  },
}));
