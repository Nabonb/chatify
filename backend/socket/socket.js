import { Server } from "socket.io";
import http from "http"; // buil in node.js http module
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; //{userId: socketId}

// Return the socket id of the receiver if they are online. Otherwise, return null.
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

// io.on() is a server-side event listener. It listens for incoming connections.
io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  // io.emit() is a client-side event listener. It emits an event to all connected clients.I can use any name for the event. ex: getOnlineUsers
  io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Whoever connects or login it immediately sends the list of online users.

  // socket.on() used to listen to the event. Can be used both server-side and client-side.
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    delete userSocketMap[userId]; // Remove user from the map when they disconnect.
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Send the updated list of online users to all connected clients.
  });
});

export { app, server, io };
