import { useEffect } from "react";
import useConversation from "../zustand/useConversation";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useContext(SocketContext);
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true; // Add a new property to the new message to indicate that it should shake when received.
      const sound = new Audio(notificationSound);
      sound.play(); // Play the notification sound when a new message is received.
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};
export default useListenMessages;
