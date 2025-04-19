import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";

const ChatContainer = () => {
  return (
    <div className="h-[100dvh] md:h-full flex flex-col flex-1">
      <ChatHeader />
      <ChatMessages />
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
