import { create } from "zustand";

const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chatTheme") || "light",
  setTheme: (theme) => {
    set({ theme: theme });
    localStorage.setItem("chatTheme", theme);
  },
}));

export default useThemeStore;
