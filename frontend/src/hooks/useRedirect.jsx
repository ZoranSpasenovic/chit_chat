import { useEffect } from "react";
import useAuthStore from "../store/useStore";
import { useNavigate } from "react-router-dom";

const useRedirect = () => {
  const navigate = useNavigate();
  const { checkAuth, user, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) navigate("/signup");
  }, [user, navigate]);

  return isCheckingAuth;
};

export default useRedirect;
