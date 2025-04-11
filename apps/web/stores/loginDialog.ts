import { create } from "zustand";

interface GoToLoginStore {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

// 创建全局状态管理store
export const useGoToLoginStore = create<GoToLoginStore>((set) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
}));
