import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import io from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    if (authUser) {
      const socket = io("https://chatify-b4qv.onrender.com", {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socket);

      // socket.on() used to listen to the event. Can be used both server-side and client-side.
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      console.log(socket);

      return () => socket.close(); // Completely closes the connection with the server
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
