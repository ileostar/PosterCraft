import { create } from "zustand";

interface UserState {
  userId: string | null;
  setUserId: (state: string | null) => void;
}

export const useUserStore = create<UserState>((set) => {
  let storage: Storage | null = null;

  if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
    storage = window.localStorage;
  }

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
