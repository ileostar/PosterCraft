/**
 * 数组元素移动函数
 *
 * @param list 数组
 * @param fromIndex 要移动元素的原始索引
 * @param toIndex 要将元素移动到的目标索引
 * @returns 移动后的数组
 */
export function arrayMove(list: any[], fromIndex: number, toIndex: number) {
  const element = list[fromIndex];
  list.splice(fromIndex, 1);
  list.splice(toIndex, 0, element);
  return list;
}

/**
 * 在数组的指定位置插入新元素
 *
 * @param arr 原始数组
 * @param index 插入位置
 * @param newItem 要插入的新元素
 * @returns 返回插入新元素后的新数组
 */
export const insertAt = (arr: any[], index: number, newItem: any) => {
  return [...arr.slice(0, index), newItem, ...arr.slice(index)];
};

/**
 * 防抖动的变化处理函数
 *
 * @param callback 回调函数，用于处理变化后的逻辑
 * @param timeout 防抖时间，默认为1000毫秒
 * @returns 返回一个防抖动的函数，用于处理每次变化时的逻辑
 */
export const debounceChange = (callback: (...args: any) => void, timeout = 1000) => {
  let timer = 0;
  return (...args: any) => {
    console.log(timer);
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      timer = 0;
      callback(...args);
    }, timeout);
  };
};
