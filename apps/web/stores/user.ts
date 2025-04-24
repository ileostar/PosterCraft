import { create } from "zustand";

interface UserState {
  userInfos: any;
  setUserInfos: (state: any) => void;
  userId: string | null;
  setUserId: (state: string | null) => void;
}

export const useUserStore = create<UserState>((set) => {
  let storage: Storage | null = null;

  let userInfos = JSON.parse(localStorage.getItem("userInfos") || "{}");

  if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
    storage = window.localStorage;
  }

  let userId: string | null = null;
  if (storage) {
    userId = storage.getItem("userId") || null;
  }

  const setUserInfos = (state: any) => {
    if (state === null) {
      userInfos = {};
    } else {
      userInfos = state;
      localStorage.setItem("userInfos", JSON.stringify(userInfos));
    }
  };

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
    userInfos,
    setUserInfos,
  };
});
