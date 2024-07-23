 import {create} from 'zustand';

type RouterNameState = {
  currentRouterName: string;
  setCurrentRouterName: (name:string) => void;
};

export const useRouterNameStore = create<RouterNameState>((set, get) => ({
  currentRouterName: '',
  setCurrentRouterName: (name:string) => set((state) => ({ currentRouterName: name })),
}));
