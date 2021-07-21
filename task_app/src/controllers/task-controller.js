"use strict";

const Task = require("../models/task.js");

const addTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();

    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (err) {
    res.status(500).send();
  }
};

const getTaskById = async (req, res) => {
  try {
    const _id = req.params.id;

    const task = await Task.findById(_id);
    if (!task) return res.status(404).send();

    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
};

module.exports = {
  addTask,
  getTasks,
  getTaskById,
};
