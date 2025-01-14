import { toast } from "@/components/ui/use-toast";
import { ResponseData } from "@/http/types/common";
import { GetWorkResponse } from "@/http/types/work";
import { cloneDeep, insertAt } from "@/utils/others/helper";
import { AllComponentProps } from "@poster-craft/bricks";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

import { RespData, RespListData } from "./respTypes";

/** 移动方向类型 */
export type MoveDirection = "Up" | "Down" | "Left" | "Right";

/** 历史记录属性接口 */
export interface HistoryProps {
  /** 历史记录ID */
  id: string;
  /** 组件ID */
  componentId: string;
  /** 操作类型 */
  type: "add" | "delete" | "modify";
  /** 历史数据 */
  data: any;
  /** 操作位置索引 */
  index?: number;
}

/** 更新组件数据接口 */
export interface UpdateComponentData {
  key: keyof AllComponentProps | Array<keyof AllComponentProps>;
  value: string | string[];
  id: string;
  isRoot?: boolean;
}

/** 频道数据接口 */
export interface ChannelProps {
  id: number;
  name: string;
  workId: number;
  status: number;
}

/** 组件数据接口 */
export interface ComponentData {
  /** 组件属性 */
  props: Partial<AllComponentProps> & {
    [key: string]: any;
  };
  /** 组件ID */
  id: string;
  /** 组件类型 */
  name: "text" | "image" | "shape";
  /** 是否隐藏 */
  isHidden?: boolean;
  /** 是否锁定 */
  isLocked?: boolean;
  /** 图层名称 */
  layerName?: string;
}

/** 所有组件属性 */
export type AllFormProps = PageProps & AllComponentProps;

/** 页面属性接口 */
export interface PageProps {
  /** 背景颜色 */
  backgroundColor: string;
  /** 背景图片 */
  backgroundImage: string;
  /** 背景重复方式 */
  backgroundRepeat: string;
  /** 背景大小 */
  backgroundSize: string;
  /** 页面高度 */
  height: string;
}

/** 页面数据接口 */
export interface PageData {
  /** 页面ID */
  id?: number;
  /** 页面属性 */
  props?: PageProps;
  /** 页面标题 */
  title?: string;
  /** 页面描述 */
  desc?: string;
  /** 封面图片 */
  coverImg?: string;
  /** 唯一标识 */
  uuid?: string;
  /** 页面设置 */
  setting?: Record<string, any>;
  /** 是否为模板 */
  isTemplate?: boolean;
  /** 是否热门 */
  isHot?: boolean;
  /** 是否新作品 */
  isNew?: boolean;
  /** 作者 */
  author?: string;
  /** 复制次数 */
  copiedCount?: number;
  /** 状态 */
  status?: number;
  /** 用户信息 */
  user?: {
    gender: string;
    nickName: string;
    picture: string;
    userName: string;
  };
}

/** 编辑器编辑状态 */
interface EditorStore {
  /** 组件列表 */
  components: ComponentData[];
  /** 当前选中的元素ID */
  currentElement: string;
  /** 页面数据 */
  page: PageData;
  /** 已复制的组件 */
  copiedComponent?: ComponentData;
  /** 历史记录列表 */
  histories: HistoryProps[];
  /** 当前历史记录索引 */
  historyIndex: number;
  /** 缓存的旧值 */
  cachedOldValues: any;
  /** 最大历史记录数 */
  maxHistoryNumber: number;
  /** 是否有未保存的更改 */
  isDirty: boolean;
  /** 频道列表 */
  channels: ChannelProps[];

  // Actions
  /** 添加组件 */
  addComponent: (component: ComponentData) => void;
  /** 设置当前选中元素 */
  setActive: (id: string) => void;
  /** 撤销操作 */
  undo: () => void;
  /** 重做操作 */
  redo: () => void;
  /** 复制组件 */
  copyComponent: (id: string) => void;
  /** 粘贴组件 */
  pasteComponent: () => void;
  /** 删除组件 */
  deleteComponent: (id: string) => void;
  /** 更新组件 */
  updateComponent: (data: {
    key: keyof AllComponentProps | Array<keyof AllComponentProps> | keyof ComponentData;
    value: string | string[] | boolean;
    id: string;
    isRoot?: boolean;
  }) => void;
  /** 设置组件 */
  setComponents: (components: ComponentData[]) => void;
  /** 更新页面 */
  updatePage: (data: { key: string; value: any; isRoot?: boolean; isSetting?: boolean }) => void;
  /** 重置编辑器 */
  resetEditor: () => void;
  /** 更新工作区 */
  updateWork: (data: ResponseData<GetWorkResponse>) => void;
  /** 保存工作区 */
  saveWork: () => void;
  /** 获取工作列表 */
  fetchChannels: ({ data }: RespListData<ChannelProps>) => void;
  /** 创建频道 */
  createChannel: ({ data }: RespData<ChannelProps>) => void;
  /** 删除频道 */
  deleteChannel: ({ payload }: RespData<any>) => void;
  /** 获取当前选中元素 */
  getCurrentElement: () => ComponentData | undefined;
  /** 获取指定元素 */
  getElement: (id: string) => ComponentData | undefined;
  /** 获取组件总数 */
  getComponentsLength: () => number;
  /** 检查是否可以撤销 */
  checkUndoDisable: () => boolean;
  /** 检查是否可以重做 */
  checkRedoDisable: () => boolean;
}

/** 页面默认属性 */
const pageDefaultProps: PageProps = {
  backgroundColor: "#ffffff",
  backgroundImage: "",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "520px",
};

/** 防抖函数 */
const debounceChange = (callback: (...args: any[]) => void, timeout = 1000) => {
  let timer = 0;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      timer = 0;
      callback(...args);
    }, timeout);
  };
};

/** 添加历史记录 */
const pushHistory = (state: EditorStore, historyRecord: HistoryProps) => {
  // 检查历史索引是否已移动
  if (state.historyIndex !== -1) {
    // 如果已移动，删除索引之后的所有记录
    state.histories = state.histories.slice(0, state.historyIndex);
    // 重置历史索引
    state.historyIndex = -1;
  }

  // 检查历史记录长度
  if (state.histories.length < state.maxHistoryNumber) {
    state.histories.push(historyRecord);
  } else {
    // 超过最大数量时，移除最早的记录并添加新记录
    state.histories.shift();
    state.histories.push(historyRecord);
  }
};

/** 添加修改历史记录 */
const pushModifyHistory = (
  state: EditorStore,
  { key, value, id }: UpdateComponentData,
  set: (
    partial:
      | EditorStore
      | Partial<EditorStore>
      | ((state: EditorStore) => EditorStore | Partial<EditorStore>),
    replace?: boolean | undefined,
  ) => void,
) => {
  pushHistory(state, {
    id: uuidv4(),
    componentId: id || state.currentElement,
    type: "modify",
    data: { oldValue: state.cachedOldValues, newValue: value, key },
  });
  set({ cachedOldValues: null });
};

/** 防抖处理历史记录 */
const pushHistoryDebounce = debounceChange(pushModifyHistory);
/** 修改历史记录 */
const modifyHistory = (
  state: EditorStore,
  history: HistoryProps,
  type: "undo" | "redo",
): ComponentData[] => {
  const { componentId, data } = history;
  const { key, oldValue, newValue } = data;
  const newKey = key as keyof AllComponentProps | Array<keyof AllComponentProps>;
  const cloneComponents = cloneDeep(state.components);
  const updatedComponent = cloneComponents.find((component) => component.id === componentId);
  if (updatedComponent) {
    if (Array.isArray(newKey)) {
      newKey.forEach((keyName, index) => {
        updatedComponent.props[keyName] = type === "undo" ? oldValue[index] : newValue[index];
      });
    } else {
      updatedComponent.props[newKey] = type === "undo" ? oldValue : newValue;
    }
  }
  return cloneComponents;
};

/**
 * 编辑器状态管理
 * @description 使用 Zustand 管理编辑器的状态和操作
 */
export const useEditorStore = create<EditorStore>((set, get) => ({
  components: [],
  currentElement: "",
  page: {
    props: pageDefaultProps,
    title: "untitled",
  },
  histories: [],
  historyIndex: -1,
  cachedOldValues: null,
  maxHistoryNumber: 5,
  isDirty: false,
  channels: [],

  addComponent: (component) => {
    set((state) => {
      const newComponent = {
        ...component,
        layerName: `图层${state.components.length + 1}`,
      };

      return {
        components: [...state.components, newComponent],
        histories: [
          ...state.histories,
          {
            id: uuidv4(),
            componentId: component.id,
            type: "add",
            data: cloneDeep(newComponent),
          },
        ],
        isDirty: true,
      };
    });
  },

  setActive: (id) => set({ currentElement: id }),

  undo: () =>
    set((state) => {
      if (state.histories.length === 0 || state.historyIndex === 0) return state;

      const newIndex =
        state.historyIndex === -1 ? state.histories.length - 1 : state.historyIndex - 1;
      const history = state.histories[newIndex];

      let newComponents = [...state.components];

      switch (history.type) {
        case "add":
          newComponents = newComponents.filter((c) => c.id !== history.componentId);
          break;
        case "delete":
          newComponents = insertAt(state.components, history.index as number, history.data);
          break;
        case "modify":
          newComponents = modifyHistory(state, history, "undo");
          break;
        default:
          break;
      }

      return {
        components: newComponents,
        historyIndex: newIndex,
      };
    }),

  redo: () =>
    set((state) => {
      if (
        state.histories.length === 0 ||
        state.historyIndex === state.histories.length ||
        state.historyIndex === -1
      )
        return state;

      const history = state.histories[state.historyIndex];
      let newComponents = [...state.components];

      switch (history.type) {
        case "add":
          newComponents.push(history.data);
          break;
        case "delete":
          newComponents = newComponents.filter((c) => c.id !== history.componentId);
          break;
        case "modify":
          debugger;
          newComponents = modifyHistory(state, history, "redo");
          break;
      }

      return {
        components: newComponents,
        historyIndex: state.historyIndex + 1,
      };
    }),

  copyComponent: (id) => {
    const component = get().components.find((c) => c.id === id);
    if (component) {
      set({ copiedComponent: component });
      toast({
        title: "Success",
        description: "已复制当前图层",
      });
    }
  },

  pasteComponent: () => {
    const { copiedComponent } = get();
    if (copiedComponent) {
      const newComponent = {
        ...cloneDeep(copiedComponent),
        id: uuidv4(),
        layerName: `${copiedComponent.layerName}副本`,
      };

      set((state) => ({
        components: [...state.components, newComponent],
        histories: [
          ...state.histories,
          {
            id: uuidv4(),
            componentId: newComponent.id,
            type: "add",
            data: cloneDeep(newComponent),
          },
        ],
        isDirty: true,
      }));

      toast({
        title: "Success",
        description: "已粘贴当前图层",
      });
    }
  },

  deleteComponent: (id) =>
    set((state) => {
      const componentIndex = state.components.findIndex((c) => c.id === id);
      if (componentIndex === -1) return state;

      const component = state.components[componentIndex];
      return {
        components: state.components.filter((c) => c.id !== id),
        histories: [
          ...state.histories,
          {
            id: uuidv4(),
            componentId: id,
            type: "delete",
            data: component,
            index: componentIndex,
          },
        ],
        isDirty: true,
      };
    }),

  updateComponent: ({ key, value, id, isRoot }) =>
    set((state) => {
      const updatedComponent = state.components.find((c) => c.id === (id || state.currentElement));
      if (!updatedComponent) return state;

      if (isRoot) {
        (updatedComponent as any)[key as string] = value;
      } else {
        console.log("key:", key, "value:", value);
        const oldValue = Array.isArray(key)
          ? key.map((key) => updatedComponent.props[key])
          : updatedComponent.props[key];
        if (!state.cachedOldValues) {
          state.cachedOldValues = oldValue;
        }
        pushHistoryDebounce(state, { key, value, id });
        if (Array.isArray(key) && Array.isArray(value)) {
          key.forEach((keyName, index) => {
            updatedComponent.props[keyName] = value[index];
          });
        } else if (typeof key === "string" && typeof value === "string") {
          updatedComponent.props[key] = value;
        }
      }

      // 添加历史记录
      pushHistoryDebounce(state, { key, value, id }, set);
      console.log("history", state.histories);
      return {
        components: state.components.map((c) =>
          c.id === updatedComponent.id ? updatedComponent : c,
        ),
        isDirty: true,
      };
    }),

  setComponents: (components: ComponentData[]) =>
    set((state) => {
      pushHistoryDebounce(state, {
        key: "components",
        value: components,
        id: state.currentElement,
      });
      return { components };
    }),

  updatePage: ({ key, value, isRoot, isSetting }) =>
    set((state) => {
      const newPage = { ...state.page };

      if (isRoot) {
        newPage[key as keyof PageData] = value;
      } else if (isSetting) {
        newPage.setting = {
          ...newPage.setting,
          [key]: value,
        };
      } else if (newPage.props) {
        newPage.props[key as keyof PageProps] = value;
      }

      return {
        page: newPage,
        isDirty: true,
      };
    }),

  resetEditor: () =>
    set({
      components: [],
      currentElement: "",
      historyIndex: -1,
      histories: [],
    }),

  updateWork: (res: ResponseData<GetWorkResponse>) => {
    const { content, ...rest } = res.data;
    set((state) => ({
      page: { ...state.page, ...rest },
      components: content.components || [],
      isDirty: false,
    }));

    if (content.props) {
      set((state) => ({
        page: { ...state.page, props: content.props },
      }));
    }
  },

  saveWork: () => {
    set({ isDirty: false });
  },

  fetchChannels: ({ data }: RespListData<ChannelProps>) => {
    set({ channels: data.list });
  },

  createChannel: ({ data }: RespData<ChannelProps>) => {
    set((state) => ({ channels: [...state.channels, data] }));
  },

  deleteChannel: ({ payload }: RespData<any>) => {
    if (payload?.urlParams) {
      const { urlParams } = payload;
      set((state) => ({
        channels: state.channels.filter((channel) => channel.id !== urlParams.id),
      }));
    }
  },

  getCurrentElement: () => {
    return get().components.find((component) => component.id === get().currentElement);
  },

  getElement: (id: string) => {
    return get().components.find((component) => component.id === id);
  },

  getComponentsLength: () => {
    return get().components.length;
  },

  checkUndoDisable: () => {
    const { histories, historyIndex } = get();
    return histories.length === 0 || historyIndex === 0;
  },

  checkRedoDisable: () => {
    const { histories, historyIndex } = get();
    return histories.length === 0 || historyIndex === histories.length || historyIndex === -1;
  },
}));
