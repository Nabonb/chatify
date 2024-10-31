import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to the bottom of the messages container.
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto scrollbar-thin scrollbar-track-transparent">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading &&
        [...Array(6)].map((_, index) => <MessageSkeleton key={index} />)}

      {!loading && messages.length === 0 && (
        <p className="flex justify-center items-center h-full">
          Send a message to start the conversation.
        </p>
      )}
    </div>
  );
};

export default Messages;
