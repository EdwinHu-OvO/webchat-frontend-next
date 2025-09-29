"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserState = {
  username: string;
  password: string;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
};

type LoginState = {
  username: string;
  setUsername: (username: string) => void;
};
export const useStoreUser = create<UserState>()(
  persist(
    (set) => ({
      username: "",
      password: "",
      setUsername: (username: string) => set({ username }),
      setPassword: (password: string) => set({ password }),
    }),
    {
      name: "webchat-user",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ username: state.username, password: state.password }),
      version: 1,
    },
  ),
);
export const useLoginState = create<LoginState>()(
  persist(
    (set) => ({
      username: "",
      setUsername: (username: string) => set({ username }),
    }),
    {
      name: "webchat-login",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ username: state.username }),
      version: 1,
    },
  ),
);
