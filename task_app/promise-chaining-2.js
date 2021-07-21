"use strict";

const mongoose = require("./src/db/mongoose.js");
const Task = require("./src/models/task.js");

// Task.findByIdAndDelete("60f6a277daed213751e1bf82")
//   .then(() => {
//     console.log("Task was removed successfully");
//     return Task.countDocuments({ completed: false });
//   })
//   .then((num) => {
//     console.log(num);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const deleteAndCount = async (id, searchParameter) => {
  try {
    const task = await Task.findByIdAndDelete(id);
    const result = await Task.countDocuments(searchParameter);

    return { task, result };
  } catch (err) {
    console.log(err);
  }
};

(async () => {
  const data = await deleteAndCount("60f6a268daed213751e1bf80", {
    completed: false,
  });
  console.log(data);
})();
