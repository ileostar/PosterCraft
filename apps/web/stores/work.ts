import { create } from "zustand";

interface WorkState {
  currentWorkId: string | null;
  setWork: (state: string | null) => void;
}

export const useWorkStore = create<WorkState>((set) => ({
  currentWorkId: localStorage.getItem("currentWorkId"),
  setWork: (state: string | null) =>
    set(() => {
      if (state === null) {
        localStorage.removeItem("currentWorkId");
      } else {
        localStorage.setItem("currentWorkId", state);
      }
      return { currentWorkId: state };
    }),
}));
