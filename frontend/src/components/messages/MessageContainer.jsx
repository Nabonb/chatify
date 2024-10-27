import demoUser from "../../assets/user.png";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import NoChatSelected from "./NoChatSelected";
const MessageContainer = () => {
  const noChatSelected = true; //for testting purpose
  return (
    <div className="md:min-w-[450px] flex flex-col">
      <>
        {noChatSelected ? (
          <NoChatSelected></NoChatSelected>
        ) : (
          <>
            {/* This is the header */}
            <div className="bg-slate-500 px-4 py-2 mb-2">
              {/* Edited */}
              <div className="flex gap-2">
                <img className="h-6 w-6" src={demoUser} alt="" />
                <span className="text-gray-900 font-bold"> John Doe</span>
              </div>
            </div>

            {/* Messages */}
            <Messages></Messages>

            {/* Message Input */}
            <MessageInput></MessageInput>
          </>
        )}
      </>
    </div>
  );
};

export default MessageContainer;
