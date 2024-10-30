import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
const MessageInput = () => {
  const [message, setMessage] = useState("");

  const { sendMessage, loading } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return; // Prevent form submission if the message input field is empty.
    await sendMessage(message);
    setMessage(""); // Clear the input field after sending the message.
  };
  return (
    <form className="px-4 my-3" onClick={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border w-full text-sm rounded-lg block p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? <div className="loading loading-spinner" /> : <BsSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
