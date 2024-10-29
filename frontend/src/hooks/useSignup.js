import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useContext(AuthContext);

  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors(
      fullName,
      username,
      password,
      confirmPassword,
      gender
    );

    //If any one of the inputs or all the inputs are invalid, then return.
    if (!success) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      // set user to the local storage
      localStorage.setItem("chat-user", JSON.stringify(data));
      //update the context with the user data
      setAuthUser(data);

      // throw new Error("Server Error"); // For testing purposes only. Remove in production.
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { signup, loading };
};

export default useSignup;

// Helper function to validate the signup form inputs.
function handleInputErrors(
  fullName,
  username,
  password,
  confirmPassword,
  gender
) {
  console.log(fullName, username, password, confirmPassword, gender);
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
