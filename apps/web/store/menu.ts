import { create } from "zustand";

interface MenuState {
  isMenuOpen: boolean;
  toggleMenu: (state: boolean) => void;
}

export const useMenuOpen = create<MenuState>((set) => ({
  isMenuOpen: false,
  toggleMenu: (state: boolean) => set(() => ({ isMenuOpen: state })),
}));
