"use strict";

const express = require("express");
const mongoose = require("./db/mongoose.js");

const userRouter = require("./routers/user-routers.js");
const taskRouter = require("./routers/task-routers.js");

const { disableGET, serviceUnavailable } = require("./middleware/disable.js");

const app = express();
const port = process.env.PORT;

//A function called before execution of route handlers

//Incoming json gets parsed as an object
app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
