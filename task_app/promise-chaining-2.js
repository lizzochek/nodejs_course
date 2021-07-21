"use strict";

const mongoose = require("./src/db/mongoose.js");
const Task = require("./src/models/task.js");

Task.findByIdAndDelete("60f6a277daed213751e1bf82")
  .then(() => {
    console.log("Task was removed successfully");
    return Task.countDocuments({ completed: false });
  })
  .then((num) => {
    console.log(num);
  })
  .catch((err) => {
    console.log(err);
  });
