import { useEffect, useState } from "react";
import useAuthStore from "../store/useStore";
import { useNavigate } from "react-router-dom";

const useRedirect = () => {
  const navigate = useNavigate();
  const { checkAuth, user, isCheckingAuth } = useAuthStore();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const check = async () => {
      await checkAuth();
      setAuthChecked(true);
    };
    check();
  }, [checkAuth]);

  useEffect(() => {
    if (authChecked && !user) navigate("/signup");
  }, [user, navigate, authChecked]);

  return  isCheckingAuth
};

export default useRedirect;
