import { useEffect } from "react";
import useChatStore from "../store/useChatStore";
import useAuthStore from "../store/useAuthStore";
import formatTime from "../utils/formatTime";
import { useRef } from "react";

const ChatMessages = () => {
  const {
    getMessages,
    selectedUser,
    isMessagesLoading,
    messages,
    updateMessages,
    leaveChat,
  } = useChatStore();

  const { user } = useAuthStore();

  useEffect(() => {
    const fetchMessages = async () => {
      await getMessages(selectedUser._id);
      updateMessages();
    };
    fetchMessages();
    return () => {
      leaveChat();
    };
  }, [getMessages, selectedUser, updateMessages, leaveChat]);

  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading)
    return <div className="flex-1 overflow-y-auto">Loading...</div>;
  return (
    <div className="flex-1 overflow-y-auto pb-8">
      {messages.map((msg) => {
        console.log(msg);
        const isSent = msg.receiverId === selectedUser._id;
        const profilePic = isSent ? user?.profilePic : selectedUser.profilePic;

        return (
          <div
            key={msg._id}
            className={`chat ${isSent ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={profilePic || "/avatars/no-profile.jfif"}
                />
              </div>
            </div>
            <div className="chat-header">
              <time className="text-xs opacity-50">
                {formatTime(msg.createdAt)}
              </time>
            </div>
            {msg.text && (
              <div
                className={`chat-bubble ${
                  isSent && "bg-primary text-base-100"
                }`}
              >
                {msg.text}
              </div>
            )}
            {msg.image && (
              <div className="w-48 rounded-lg m -4">
                <img
                  className="w-full h-auto"
                  src={msg.image}
                  alt="image could not render"
                />
              </div>
            )}
          </div>
        );
      })}
      <div ref={scrollRef} />
    </div>
  );
};

export default ChatMessages;
