"use strict";

const mongoose = require("./src/db/mongoose.js");
const User = require("./src/models/user.js");

// User.findByIdAndUpdate("60f6a00673f00f2b2fda55ad", { age: 12 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 12 });
//   })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const updateAgeAndCount = async (id, changes) => {
  const user = await User.findByIdAndUpdate(id, changes);
  const result = await User.countDocuments(changes);

  return { user, result };
};

(async () => {
  const data = await updateAgeAndCount("60f6a00673f00f2b2fda55ad", { age: 25 });
  console.log(data);
})();
