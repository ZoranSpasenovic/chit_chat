import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const useAuthStore = create((set) => ({
  user: null,
  isCheckingAuth: false,
  isSigninUp: false,
  isLogingIn: false,
  isUpdatingProfile: false,
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = axiosInstance.get("/auth/check");
      set({ user: res.data });
    } catch (err) {
      console.log(err);
      set({ user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));

export default useAuthStore;
