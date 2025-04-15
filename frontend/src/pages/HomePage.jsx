import useRedirect from "../hooks/useRedirect";
import { Loader } from "lucide-react";
import useChatStore from "../store/useChatStore";
import { useEffect } from "react";
import SideBar from "../components/SideBar";
import NoChat from "../components/NoChat";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const isCheckingAuth = useRedirect();
  const { getUsers, selectedUser } = useChatStore();
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isCheckingAuth)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden ">
            <SideBar />
            {selectedUser ? <ChatContainer /> : <NoChat />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
