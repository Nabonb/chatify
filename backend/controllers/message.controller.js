import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  const { message } = req.body;
  const { id: receiverId } = req.params; // This is who will receive the messages
  const senderId = req.user._id; // This is the user who will sent the messages(ex: Me)

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  // If there is no previous conversation, creating new conversation
  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    message,
  });

  // Save the new message to the conversation
  if (newMessage) {
    conversation.messages.push(newMessage._id);
  }

  //Socket.io implementation here

  // await conversation.save();
  // await newMessage.save();

  // This is run parallel to save both conversation and new message at the same time. This is much faster than saving them separately.
  await Promise.all([conversation.save(), newMessage.save()]);

  res.status(201).json(newMessage);

  try {
  } catch (error) {
    console.log("Error sending message: ", error.message);
    res.status(500).json({ message: "Internel Server Error" });
  }
};
