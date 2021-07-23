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

router.post("/tasks", addTask);
router.get("/tasks", getTasks);
router.get("/tasks/:id", getTaskById);
router.patch("/tasks/:id", updateTaskById);
router.delete("/tasks/:id", deleteTaskById);

module.exports = router;
