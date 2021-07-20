"use strict";

const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task_app_api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("Age must be a positive number");
    },
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Enter a valid email!");
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password"))
        throw new Error("The password can't contain the word 'password'");
    },
  },
});

// const me = new User({
//   name: "       Liza     ",
//   email: "littled685@gmail.com",
//   password: "     1234567   ",
// });

// me.save()
//   .then(() => console.log(me))
//   .catch((error) => console.log(error));

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const buyMilk = new Task({
  description: "    Go buy milk    ",
  completed: false,
});

buyMilk
  .save()
  .then(() => console.log(buyMilk))
  .catch((error) => console.log(error));
