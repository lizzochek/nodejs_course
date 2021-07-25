"use strict";

const express = require("express");
const mongoose = require("./db/mongoose.js");

const userRouter = require("./routers/user-routers.js");
const taskRouter = require("./routers/task-routers.js");

const app = express();

//A function called before execution of route handlers

//Incoming json gets parsed as an object
app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

module.exports = app;
