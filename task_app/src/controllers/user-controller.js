"use strict";
const User = require("../models/user.js");

const addUser = async (req, res) => {
  try {
    const user = new User(req.body);

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

module.exports = {
  addUser,
  getUsers,
  getUserById,
};
