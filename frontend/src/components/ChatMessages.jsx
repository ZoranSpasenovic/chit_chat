import { useEffect } from "react";
import useChatStore from "../store/useChatStore";
import useAuthStore from "../store/useAuthStore";
import formatTime from "../utils/formatTime";
import { useRef } from "react";

const ChatMessages = () => {
  const { getMessages, selectedUser, isMessagesLoading, messages } =
    useChatStore();

  const { user } = useAuthStore();

  useEffect(() => {
    const fetchMessages = async () => {
      await getMessages(selectedUser._id);
    };
    fetchMessages();
  }, [getMessages, selectedUser]);
  console.log(selectedUser);

  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading)
    return <div className="flex-1 overflow-y-auto">Loading...</div>;
  return (
    <div className="flex-1 overflow-y-auto pb-8">
      {messages.map((msg) => {
        const isSent = msg.receiverId === selectedUser._id;
        const profilePic = isSent ? user?.profilePic : selectedUser.profilePic;

        return (
          <div key={msg._id} className={`chat ${isSent ? "chat-end" : "chat-start"}`}>
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
            <div className={`chat-bubble ${isSent && "bg-primary"}`}>
              {msg.text}
            </div>
            {/* <div className="chat-footer opacity-50">Delivered</div> */}
          </div>
        );
      })}
      <div ref={scrollRef} />
    </div>
  );
};

export default ChatMessages;
