import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // To get user data from local storage with named key "chat-user"
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("user-chat")) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
