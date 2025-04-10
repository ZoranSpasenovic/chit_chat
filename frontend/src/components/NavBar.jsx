import { Link } from "react-router-dom";
import useAuthStore from "../store/useStore";
import { useNavigate } from "react-router-dom";
import { User, LogOutIcon, Settings } from "lucide-react";

const NavBar = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await logout();
    if (res) {
      navigate("/login");
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm fixed">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl">Chit Chat</Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="/avatars/no-profile.jpg"
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
              <Link to="/settings" className="justify-between">
                Settings
                <span>
                  <Settings />
                </span>
              </Link>
            </li>
            <li>
              <button className="justify-between" onClick={handleLogout}>
                Logout
                <span>
                  <LogOutIcon />
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
