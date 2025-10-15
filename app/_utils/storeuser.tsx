"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserState = {
  username: string;
  password: string;
  setStoreUsername: (username: string) => void;
  setStorePassword: (password: string) => void;
};

type LoginState = {
  username: string;
  userId: string;
  setLoginUsername: (username: string) => void;
  setLoginUserId: (userId: string) => void;
};
export const useStoreUser = create<UserState>()(
  persist(
    (set) => ({
      username: "",
      password: "",
      setStoreUsername: (username: string) => set({ username }),
      setStorePassword: (password: string) => set({ password }),
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
      userId: "",
      username: "",
      setLoginUsername: (username: string) => set({ username }),
      setLoginUserId: (userId: string) => set({ userId }),
    }),
    {
      name: "webchat-login",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ username: state.username, userId: state.userId }),
      version: 1,
    },
  ),
);
