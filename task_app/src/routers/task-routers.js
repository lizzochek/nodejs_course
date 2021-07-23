"use strict";

const express = require("express");
const User = require("../models/user.js");
const auth = require("../middleware/auth.js");

const {
  addTask,
  getTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} = require("../controllers/task-controller.js");

const router = new express.Router();

router.post("/tasks", auth, addTask);
router.get("/tasks", auth, getTasks);
router.get("/tasks/:id", auth, getTaskById);
router.patch("/tasks/:id", auth, updateTaskById);
router.delete("/tasks/:id", auth, deleteTaskById);

module.exports = router;
