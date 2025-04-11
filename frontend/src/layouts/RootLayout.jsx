import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Toaster } from "react-hot-toast";
import useThemeStore from "../store/useThemeStore";
import { useEffect } from "react";

const RootLayout = () => {
  const { theme } = useThemeStore();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <>
      <NavBar />
      <Outlet />
      <Toaster />
    </>
  );
};

export default RootLayout;
