"use strict";

const socket = io();

socket.on("message", (message) => {
  console.log(message);
});

document.querySelector("#message-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const message = e.target.elements.message.value;
  socket.emit("sendMessage", message);
});

document.querySelector("#share-location").addEventListener("click", () => {
  if (!navigator.geolocation)
    return alert("Geolocation is not supported by your browser!");

  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;

    socket.emit("sendLocation", { latitude, longitude });
  });
});