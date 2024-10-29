import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // Retrieve token from cookie

    if (!token) {
      return res
        .status(401)
        .json({ error: "Not authorized, token is required" });
    }

    // Verify Token Here
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Token is invalid" });
    }

    const user = await User.findById(decoded.userId).select("-password"); // Here it is called userId beacuse we set userId in the jwt.sign function in generateToken.js and .select("-password") means we are not sending password in response.

    //If user not found, return 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Set user to req object for further use in route handlers.
    next(); // If everything is fine, continue to the next middleware or route handler.
  } catch (error) {
    console.log("Error occurred while protecting route: ", error.message);
    res.status(500).json({ error: "Intrenal Server Error" });
  }
};

export default protectRoute;
