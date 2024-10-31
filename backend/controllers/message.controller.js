import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

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

  // await conversation.save();
  // await newMessage.save();

  // This is run parallel to save both conversation and new message at the same time. This is much faster than saving them separately.
  await Promise.all([conversation.save(), newMessage.save()]);

  //Socket.io implementation here
  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    // io.to(<socket_id>).emit() used to send events to specific client
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  res.status(201).json(newMessage);

  try {
  } catch (error) {
    console.log("Error sending message: ", error.message);
    res.status(500).json({ error: "Internel Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params; // This is who will receive the messages
    const senderId = req.user._id; // This is the user who will send the messages(ex: Me)

    const converation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); //(.populate)=> used you retrieve all the relevant fields from each Message document directly not the reference id.

    if (!converation) return res.status(200).json([]); //if there is no conversation between the two users return an empty array.

    res.status(200).json(converation.messages);
  } catch (error) {
    console.log("Error getting message: ", error.message);
    res.status(500).json({ error: "Internel Server Error" });
  }
};
