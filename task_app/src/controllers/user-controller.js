"use strict";
const User = require("../models/user.js");

const addUser = async (req, res) => {
  try {
    const user = new User(req.body);

    //Hash password
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = new User(req.body);
    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

const getUserById = async (req, res) => {
  try {
    const _id = req.params.id;

    const user = await User.findById(_id);
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (err) {
    res.status(500).send();
  }
};

const updateUserById = async (req, res) => {
  const allowedUpdates = ["name", "email", "password", "age"];
  const updates = Object.keys(req.body);

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates" });

  //Hash password
  try {
    const _id = req.params.id;

    const user = await User.findById(_id);

    updates.forEach((update) => (user[update] = req.body[update]));

    await user.save();

    //Can't use this part for middlewares
    //const user = await User.findByIdAndUpdate(_id, req.body, {
    //  new: true, //Returns and object after update, not before
    //  runValidators: true, //Validate the changes
    //});
    if (!user) return res.status(404).send();

    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findByIdAndDelete(_id);

    if (!user) return res.status(404).send();

    res.send("User was successfully deleted", user);
  } catch (err) {
    res.status(500).send(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  addUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser,
};
