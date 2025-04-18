import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "production" ? "/" : "http://localhost:5001";

const useAuthStore = create((set, get) => ({
  user: null,
  isCheckingAuth: false,
  isSigninUp: false,
  isLogingIn: false,
  isUpdatingProfile: false,
  socket: null,
  onlineUsers: [],
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ user: res.data });
      get().connectSocket();
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
      toast.success("Successfull Signup!");

      return res;
    } catch (err) {
      console.log("Signup Err: " + err);
      toast.error(err);
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
      set({ user: null });
      toast.success("logged out successfully");
      get().disconnectSocket();
      return res;
    } catch (err) {
      toast.error("Error loggin out " + err);
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
  connectSocket: () => {
    const { user } = get();
    if (!user || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: { userId: user._id },
    });

    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    const { socket } = get();

    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));

export default useAuthStore;
