import { create } from "zustand";

type GithubUsernameState = {
  githubUsername: string;
  setGithubUsername: (name: string) => void;
};
type Oauth2DialogState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const useGithubUsername = create<GithubUsernameState>((set, get) => ({
  githubUsername: "",
  setGithubUsername: (name: string) => set((state) => ({ githubUsername: name })),
}));

export const useOauth2Dialog = create<Oauth2DialogState>((set, get) => ({
  isOpen: false,
  setIsOpen: (a: boolean) => set((state) => ({ isOpen: a })),
}));
