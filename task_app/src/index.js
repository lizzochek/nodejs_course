"use strict";

const express = require("express");
const mongoose = require("./db/mongoose.js");

const User = require("./models/user.js");
const Task = require("./models/task.js");

const {
  addUser,
  getUsers,
  getUserById,
} = require("./controllers/user-controller.js");
const {
  addTask,
  getTasks,
  getTaskById,
} = require("./controllers/task-controller.js");

const app = express();
const port = process.env.PORT || 3000;

//Incoming json gets parsed as an object
app.use(express.json());

//Users

app.post("/users", addUser);

app.get("/users", getUsers);

app.get("/users/:id", getUserById);

//Tasks

app.post("/tasks", addTask);

app.get("/tasks", getTasks);

app.get("/tasks/:id", getTaskById);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
