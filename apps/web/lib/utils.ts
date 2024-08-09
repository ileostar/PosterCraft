import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function getParentElement(element: HTMLElement, className: string) {
   while(element){
    if(element.classList&&element.classList.contains(className)){
      return element;
    }else{
      element = element.parentNode as HTMLElement;
    }
   }
   return null;
}


export function arrayMove(list: any[], fromIndex: number, toIndex: number) {
  const element = list[fromIndex];
  list.splice(fromIndex, 1);
  list.splice(toIndex, 0, element);
  return list;
}