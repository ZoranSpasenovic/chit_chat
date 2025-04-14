const SideBar = ({ users }) => {
  return (
    <div className="basis-[20%] h-full overflow-y-auto">
      <ul className="list">
        {users.map((user) => {
          return (
            <li
              className="list-row hover:cursor-pointer hover:bg-base-200"
              key={user._id}
            >
              <div>
                <img
                  class="size-10 rounded-box"
                  src="/avatars/no-profile.webp"
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
