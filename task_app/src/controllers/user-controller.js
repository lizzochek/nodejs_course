"use strict";
const User = require("../models/user.js");

const addUser = async (req, res) => {
  try {
    const user = new User(req.body);

    //Hash password by middleware
    await user.save();

    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
};

const getUserProfile = async (req, res) => {
  res.send(req.user);
};

const updateUser = async (req, res) => {
  const allowedUpdates = ["name", "email", "password", "age"];
  const updates = Object.keys(req.body);

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates" });

  try {
    const user = await User.findById(req.user._id);

    updates.forEach((update) => (user[update] = req.body[update]));

    //Hash password by middleware
    await user.save();

    //Can't use this part for middleware
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

const deleteUser = async (req, res) => {
  try {
    //Not needed any more
    // const user = await User.findByIdAndDelete(req.user._id);
    // if (!user) return res.status(404).send();

    await req.user.remove();
    res.send("User was successfully deleted");
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

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.status(200).send("User was successfully logged out");
  } catch (err) {
    res.status(500).send();
  }
};

const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.status(200).send("All the devices were successfully logged out");
  } catch (err) {
    res.status(500).send();
  }
};

module.exports = {
  addUser,
  getUserProfile,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  logoutAll,
};
