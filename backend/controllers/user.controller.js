import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    ); // Give all the user except the logged in user. Beacuse we don't want to send messages to ourself.

    res.status(200).json(allUsers); // Send all the users to the client.
  } catch (error) {
    console.log(
      "Error occurred while getting users for sidebar: ",
      error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};
