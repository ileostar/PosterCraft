import { create } from "zustand";

interface WorkState {
  currentWorkId: string | null;
  setWork: (state: string | null) => void;
}

export const useWorkStore = create<WorkState>((set) => {
  let storage: Storage | null = null;

  // 检查 localStorage 是否可用
  if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
    storage = window.localStorage;
  }

  // 初始化 currentWorkId
  let currentWorkId: string | null = null;
  if (storage) {
    currentWorkId = storage.getItem("currentWorkId") || null;
  }

  return {
    currentWorkId,
    setWork: (state: string | null) => {
      set(() => {
        if (storage) {
          if (state === null) {
            storage.removeItem("currentWorkId");
          } else {
            storage.setItem("currentWorkId", state);
          }
        }
        return { currentWorkId: state };
      });
    },
  };
});
