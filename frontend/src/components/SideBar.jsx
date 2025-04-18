import useChatStore from "../store/useChatStore";
import useAuthStore from "../store/useAuthStore";
import { Users2 } from "lucide-react";
import { useState } from "react";

const SideBar = () => {
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);
  const handleChange = (e) => {
    setShowOnlineUsers(e.target.checked);
  };
  const { users, selectUser, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const sortedUsers = users.sort((a, b) => {
    if (onlineUsers.includes(a._id) && !onlineUsers.includes(b._id)) {
      return -1;
    } else if (!onlineUsers.includes(a._id) && onlineUsers.includes(b._id)) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <div
      className={`${
        selectedUser ? "hidden" : ""
      } flex-1 lg:flex-none lg:block h-full overflow-y-auto`}
    >
      <div className="pl-4 pt-4 space-y-2">
        <div className=" flex gap-2">
          <Users2 />
          <h2>Contacts</h2>
        </div>
        <div className="flex gap-2">
          <input
            onChange={handleChange}
            type="checkbox"
            className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-primary checked:border-primary transition-all cursor-pointer"
          />

          <p>Online contacts</p>
        </div>
      </div>

      <ul className="list mt-4">
        {sortedUsers.map((user) => {
          if (showOnlineUsers && !onlineUsers.includes(user._id)) return;
          return (
            <li
              onClick={() => {
                selectUser(user);
              }}
              className={`list-row hover:cursor-pointer hover:bg-base-200 pr-4 ${
                selectedUser?._id === user._id ? "bg-base-200" : ""
              }`}
              key={user._id}
            >
              <div>
                <img
                  class="size-10 rounded-box"
                  src={
                    user.profilePic
                      ? user.profilePic
                      : "/avatars/no-profile.webp"
                  }
                />
              </div>
              <div>
                <div>{user.fullName}</div>
                <div className="text-xs font-semibold opacity-60">
                  {user.email}
                </div>
                <div
                  className={`text-xs ${
                    onlineUsers.includes(user._id) ? "text-primary" : ""
                  }`}
                >
                  {onlineUsers.includes(user._id) ? "online" : "offline"}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
