export interface ElementStoreType {
  Elements: ElementDataType[];
  currentElement: string;
  pageBackgroundStyle: { [key: string]: string };
}

export interface ElementDataType {
  // 元素样式属性
  props: { [key: string]: any };
  // 元素id
  id: string;
  // 元素类型：text,img,graph
  type: "text" | "img" | "graph";
  // 可选的text属性，类型为string或null
  text?: string | null;
  // 跳转url
  url?: string;
  // 图层是否隐藏
  isHidden?: boolean;
  // 图层是否锁定
  isLocked?: boolean;
  // 图层名称
  layerName?: string;
}


