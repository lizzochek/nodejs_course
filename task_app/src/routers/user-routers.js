"use strict";

const express = require("express");
const User = require("../models/user.js");
const auth = require("../middleware/auth.js");

const {
  addUser,
  getUserProfile,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser,
} = require("../controllers/user-controller.js");

const router = new express.Router();

router.post("/users", addUser);
router.get("/users/me", auth, getUserProfile);
router.get("/users/:id", getUserById);
router.patch("/users/:id", updateUserById);
router.delete("/users/:id", deleteUserById);
router.post("/users/login", loginUser);

module.exports = router;