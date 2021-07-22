"use strict";

const express = require("express");
const mongoose = require("./db/mongoose.js");

const {
  addUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("./controllers/user-controller.js");
const {
  addTask,
  getTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
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
app.delete("/users/:id", deleteUserById);

//Tasks

app.post("/tasks", addTask);
app.get("/tasks", getTasks);
app.get("/tasks/:id", getTaskById);
app.patch("/tasks/:id", updateTaskById);
app.delete("/tasks/:id", deleteTaskById);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
