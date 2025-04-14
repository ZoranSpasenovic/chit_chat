import useChatStore from "../store/useChatStore";
import { Users2 } from "lucide-react";

const SideBar = () => {
  const { users, selectUser, selectedUser } = useChatStore();
  return (
    <div className="w-2xs h-full overflow-y-auto">
      <div className="pl-4 pt-4 space-y-2">
        <div className=" flex gap-2">
          <Users2 />
          <h2>Contacts</h2>
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-primary checked:border-primary transition-all cursor-pointer"
          />

          <p>Online contacts</p>
        </div>
      </div>

      <ul className="list mt-4">
        {users.map((user) => {
          return (
            <li
              onClick={() => {
                selectUser(user);
              }}
              className={`list-row hover:cursor-pointer hover:bg-base-200 ${selectedUser._id === user._id ? "bg-base-200" : "*:"}`}
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
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
