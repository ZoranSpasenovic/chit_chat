import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

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
      toast.success(res.data.message);
      return res;
    } catch (err) {
      console.log("Signup Err: " + err);
      toast.error(err.response.data.message);
    } finally {
      set({ isSigninUp: false });
    }
  },
  login: async (data) => {
    set({ isLogingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      toast.success(res.data.message);
      return res;
    } catch (err) {
      console.log("LOGIN ERR: " + err);
      toast.error(err.response.data.message);
    } finally {
      set({ isLogingIn: false });
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      toast.success("logged out successfully");
      return res;
    } catch (err) {
      toast.error(err.response.data.message);
      console.log("LOGOUT ERR: " + err);
    }
  },
  updateProfilePic: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      await axiosInstance.put("/auth/update-profile", data);
      toast.success("Image uploaded successfully");
    } catch (err) {
      console.log("ERROR while uploading photo: " + err);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));

export default useAuthStore;
