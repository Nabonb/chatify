import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";
const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <div className="py-2 flex flex-col overflow-auto scrollbar-thin scrollbar-track-transparent">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1} // That means it's the last conversation in the list and its used for to remove the bottom horizontal divider line of the conversation list.
        />
      ))}
      {loading ? <span className="loading loading-spinner mx-auto"></span> : ""}
    </div>
  );
};

export default Conversations;
