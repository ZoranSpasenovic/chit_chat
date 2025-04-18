import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

import useAuthStore from "./useAuthStore";

const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");

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
      set({ messages: res.data });
    } catch (err) {
      console.log("Error fetching messages: " + err);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (data) => {
    const { selectedUser, messages } = get();

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        data
      );

      set({ messages: [...messages, res.data] });
    } catch (err) {
      console.log("Sending message failed: " + err);
    }
  },
  selectUser: (selectedUser) => {
    set({ selectedUser });
  },
  updateMessages: () => {
    const { selectedUser } = get();

    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.off("receiveMessage");
    socket.on("receiveMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;
      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
    });
  },
  leaveChat: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("receiveMessage");
  },
}));

export default useChatStore;
