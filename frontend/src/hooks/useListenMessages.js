import { useEffect } from "react";
import useConversation from "../zustand/useConversation";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const useListenMessages = () => {
  const { socket } = useContext(SocketContext);
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      console.log("Now working?");
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};
export default useListenMessages;
