export const sendMessage = async (req, res) => {
  const { message } = req.body;
  const { id } = req.params; // This is who will receive the messages
  const senderId = req.userId; // This is the user who will sent the messages
  try {
  } catch (error) {
    console.log("Error sending message: ", error.message);
    res.status(500).json({ message: "Internel Server Error" });
  }
};
