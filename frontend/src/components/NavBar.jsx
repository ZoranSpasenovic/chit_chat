import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { User, LogOutIcon, LogInIcon } from "lucide-react";
import ThemeDropDown from "./ThemeDropDown";

const NavBar = () => {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await logout();
    if (res) {
      navigate("/login");
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm fixed z-1">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl">Chit Chat</Link>
      </div>
      <div className="flex-none">
        <ThemeDropDown />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={
                  user?.profilePic
                    ? user.profilePic
                    : "/avatars/no-profile.jfif"
                }
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span>
                  <User />
                </span>
              </Link>
            </li>

            <li>
              {user ? (
                <button className="justify-between" onClick={handleLogout}>
                  Logout
                  <span>
                    <LogOutIcon />
                  </span>
                </button>
              ) : (
                <Link className="justify-between">
                  Login
                  <span>
                    <LogInIcon />
                  </span>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
