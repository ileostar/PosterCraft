 export interface ElementStore {
    Elements: ElementData[];
    currentElement: string;
 }

 export interface ElementData {
    // 元素样式属性
    props:{[key: string]: any};
    // 元素id
    id:string;
    // 元素类型：text,img,graph
    type:'text' | 'img' | 'graph';
    // 可选的text属性，类型为string或null
    text?: string | null;
 }

  