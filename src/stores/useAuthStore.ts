import create from "zustand";
import { persist } from "zustand/middleware";

import { AuthStore } from "../constants";

const useAuthStore = create<AuthStore>(
  persist(
    (set) => ({
      token: "",
      setToken: (token: string | undefined) => set({ token }),
    }),
    {
      name: "meldToken",
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
