"use strict";

const Task = require("../models/task.js");

const addTask = async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      owner: req.user._id,
    });
    await task.save();

    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });
    res.send(tasks);
  } catch (err) {
    res.status(500).send();
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) return res.status(404).send();

    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
};

const updateTaskById = async (req, res) => {
  const allowedUpdates = ["description", "completed"];
  const updates = Object.keys(req.body);

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates" });

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) return res.status(404).send();

    updates.forEach((update) => (task[update] = req.body[update]));

    await task.save();

    //Not suitable for middleware usage
    // const task = await Task.findByIdAndUpdate(_id, req.body, {
    //   new: true, //Returns and object after update, not before
    //   runValidators: true, //Validate the changes
    // });

    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) return res.status(404).send();

    res.send("Task was successfully deleted");
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  addTask,
  getTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
