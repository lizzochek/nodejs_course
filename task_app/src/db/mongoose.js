"use strict";

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/task_app_api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// const User = mongoose.model("User", {
//   name: { type: String },
//   age: { type: Number },
// });

// const me = new User({ name: "Liza", age: 19 });

// me.save()
//   .then(() => console.log(me))
//   .catch((error) => console.log(error));

const Task = mongoose.model("Task", {
  description: { type: String },
  completed: { type: Boolean },
});

const buyMilk = new Task({ description: "Go buy milk", completed: false });

buyMilk
  .save()
  .then(() => console.log(buyMilk))
  .catch((error) => console.log(error));
