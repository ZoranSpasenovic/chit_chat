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
      const res = await axiosInstance.get("/auth/check");
      console.log(res.data)
      set({ user: res.data });
    } catch (err) {
      console.log(err);
      set({ user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigninUp: true });
    try {
      const res = axiosInstance.post("/auth/signup", data);
      return res;
    } catch (err) {
      console.log("Signup Err: " + err);
    } finally {
      set({ isSigninUp: false });
    }
  },
  login: async (data) => {
    set({ isLogingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      return res;
    } catch (err) {
      console.log("LOGIN ERR: " + err);
    } finally {
      set({ isLogingIn: false });
    }
  },
}));

export default useAuthStore;
