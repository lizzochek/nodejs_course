"use strict";

const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const path = require("path");
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.emit("message", "Welcome to the chat app!");
  socket.broadcast.emit("message", "A new user joined");

  socket.on("sendMessage", (message) => {
    io.emit("message", message);
  });

  socket.on("sendLocation", (coords) => {
    io.emit(
      "message",
      `Location: https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`
    );
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user has left");
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
