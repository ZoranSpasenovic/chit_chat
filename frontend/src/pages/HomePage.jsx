import useRedirect from "../hooks/useRedirect";
import { Loader } from "lucide-react";

const HomePage = () => {
  const isCheckingAuth = useRedirect();
  if (isCheckingAuth)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return <div>HomePage</div>;
};

export default HomePage;
