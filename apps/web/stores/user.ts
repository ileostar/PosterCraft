import { create } from "zustand";

interface UserState {
  userId: string | null;
  setUserId: (state: string | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: localStorage.getItem("userId"),
  setUserId: (state: string | null) =>
    set(() => {
      if (state === null) {
        localStorage.removeItem("userId");
      } else {
        localStorage.setItem("userId", state);
      }
      return { userId: state };
    }),
}));
