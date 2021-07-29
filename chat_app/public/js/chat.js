"use strict";

const socket = io();

//Elements
const form = document.querySelector("#message-form");
const formInput = form.querySelector("input");
const formButton = form.querySelector("button");
const locationButton = document.querySelector("#share-location");
const messages = document.querySelector("#messages");

//Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationTemplate = document.querySelector("#location-template").innerHTML;

//Options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

socket.on("message", (obj) => {
  const html = Mustache.render(messageTemplate, {
    message: obj.text,
    createdAt: moment(obj.createdAt).format("H:mm"),
  });
  messages.insertAdjacentHTML("beforeend", html);
});

socket.on("locationMessage", (obj) => {
  const html = Mustache.render(locationTemplate, {
    url: obj.url,
    createdAt: moment(obj.createdAt).format("H:mm"),
  });
  messages.insertAdjacentHTML("beforeend", html);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  //disable the form
  formButton.setAttribute("disabled", "disabled");

  const message = e.target.elements.message.value;

  socket.emit("sendMessage", message, (error) => {
    //enable and clear the form
    formButton.removeAttribute("disabled");
    formInput.value = "";
    formInput.focus();

    if (error) return console.log(error);
    console.log("Message delivered");
  });
});

locationButton.addEventListener("click", () => {
  if (!navigator.geolocation)
    return alert("Geolocation is not supported by your browser!");

  //disable the button
  locationButton.setAttribute("disabled", "disabled");

  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;

    socket.emit("sendLocation", { latitude, longitude }, () => {
      //enable the button
      locationButton.removeAttribute("disabled");
      console.log("Location sent");
    });
  });
});

socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});
