import {create} from 'zustand';


type ElementStore= {
    Elements: ElementData[];
    // 当前选中的元素
    currentElement: string;
    addElement: (element:ElementData) => void;
    deleteElement: (id:string) => void;
    updateElement: (id:string, props:any) => void;
    setCurrentElement: (id:string) => void;
 }

type ElementData= {
    // 元素样式属性
    props:{[key: string]: any};
    // 元素id
    id:string;
    // 元素类型：text,img,graph
    type:'text' | 'img' | 'graph';
    // 可选的text属性，类型为string或null
    text?: string | null;
 }
 

export const UseElementStore = create<ElementStore>((set, get) => ({
    Elements: [],
    currentElement: '',
    // 添加元素
    addElement: (element: ElementData) => set((state) => ({ Elements: [...state.Elements, element] })),
    // 删除元素
    deleteElement: (id: string) => set((state) => {
        const newState = state.Elements.filter(item=> item.id !== id);
        return { Elements: newState };
      }),
    // 更新元素
    updateElement: (id: string, props: any) => set((state) => {
        const newState = state.Elements.map(item=> {
            if (item.id === id) return {
                props: {...item.props,
                    ...props
                },
                id: item.id,
                type: item.type
            };
            return item;
          });
        return { Elements: newState };
      }),
    // 当前选中的元素
    setCurrentElement: (elementId: string) => set((state) => ({ currentElement: elementId })),
}));

 