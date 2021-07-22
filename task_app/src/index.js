"use strict";

const express = require("express");
const mongoose = require("./db/mongoose.js");

const User = require("./models/user.js");
const Task = require("./models/task.js");

const {
  addUser,
  getUsers,
  getUserById,
  updateUserById,
} = require("./controllers/user-controller.js");
const {
  addTask,
  getTasks,
  getTaskById,
  updateTaskById,
} = require("./controllers/task-controller.js");

const app = express();
const port = process.env.PORT || 3000;

//Incoming json gets parsed as an object
app.use(express.json());

//Users

app.post("/users", addUser);
app.get("/users", getUsers);
app.get("/users/:id", getUserById);
app.patch("/users/:id", updateUserById);

//Tasks

app.post("/tasks", addTask);
app.get("/tasks", getTasks);
app.get("/tasks/:id", getTaskById);
app.patch("/tasks/:id", updateTaskById);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
