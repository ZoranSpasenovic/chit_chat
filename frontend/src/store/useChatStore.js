import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      console.log(res.data);
      set({ users: res.data });
    } catch (err) {
      console.log("Error loading users: " + err);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (id) => {
    set({ isMessagesLoading: true });

    try {
      const res = await axiosInstance.get(`/messages/${id}`);
      return res;
    } catch (err) {
      console.log("Error fetching messages: " + err);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  selectUser: (selectedUser) => {
    set({ selectedUser });
  },
}));

export default useChatStore;
