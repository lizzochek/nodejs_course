"use strict";

const express = require("express");
const mongoose = require("./db/mongoose.js");

const User = require("./models/user.js");
const Task = require("./models/task.js");

const app = express();
const port = process.env.PORT || 3000;

//Incoming json gets parsed as an object
app.use(express.json());

// app.post("/users", (req, res) => {
//   const user = new User(req.body);

//   user
//     .save()
//     .then(() => {
//       res.status(201).send(user);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

app.post("/tasks", (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => {
      res.status(201).send(task);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
