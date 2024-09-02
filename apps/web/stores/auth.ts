import { create } from "zustand";

type GithubUsernameState = {
  githubUsername: string;
  setGithubUsername: (name: string) => void;
};
type Oauth2DialogState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const useGithubUsername = create<GithubUsernameState>((set, _get) => ({
  githubUsername: "",
  setGithubUsername: (name: string) => set((_state) => ({ githubUsername: name })),
}));

export const useOauth2Dialog = create<Oauth2DialogState>((set, _get) => ({
  isOpen: false,
  setIsOpen: (a: boolean) => set((_state) => ({ isOpen: a })),
}));
