import { X } from "lucide-react";
import useChatStore from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser: user, selectUser } = useChatStore();

  return (
    <div className="flex justify-between p-2 rounded-sm bg-base-200 items-center">
      <div className="flex flex-row justify-center items-center gap-2">
        <div className="size-10 rounded-full overflow-hidden">
          <img
            className="w-auto h-full"
            src={user?.profilePic || "/avatars/no-profile.jfif"}
            alt={user?.fullName}
          />
        </div>
        <div className="flex flex-col text-xs">
          <span>{user.fullName}</span>
          <span>offline</span>
        </div>
      </div>

      <div
        onClick={() => {
          selectUser(null);
        }}
        className="hover:cursor-pointer"
      >
        <X />
      </div>
    </div>
  );
};

export default ChatHeader;
