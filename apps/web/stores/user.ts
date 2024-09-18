import { create } from "zustand";

interface UserState {
  userId: string | null;
  setUserId: (state: string | null) => void;
}

export const useUserStore = create<UserState>((set) => {
  let storage: Storage | null = null;

  // 检查 localStorage 是否可用
  if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
    storage = window.localStorage;
  }

  // 初始化 currentWorkId
  let userId: string | null = null;
  if (storage) {
    userId = storage.getItem("userId") || null;
  }

  return {
    userId,
    setUserId: (state: string | null) => {
      set(() => {
        if (storage) {
          if (state === null) {
            storage.removeItem("userId");
          } else {
            storage.setItem("userId", state);
          }
        }
        return { userId: state };
      });
    },
  };
});
