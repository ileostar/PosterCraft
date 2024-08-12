export function arrayMove(list: any[], fromIndex: number, toIndex: number) {
  const element = list[fromIndex];
  list.splice(fromIndex, 1);
  list.splice(toIndex, 0, element);
  return list;
}
