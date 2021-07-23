"use strict";

const express = require("express");
const User = require("../models/user.js");
const auth = require("../middleware/auth.js");

const {
  addUser,
  getUserProfile,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  logoutAll,
} = require("../controllers/user-controller.js");

const router = new express.Router();

router.post("/users", addUser);
router.get("/users/me", auth, getUserProfile);
router.patch("/users/me", auth, updateUser);
router.delete("/users/me", auth, deleteUser);
router.post("/users/login", loginUser);
router.post("/users/logout", auth, logoutUser);
router.post("/users/logoutAll", auth, logoutAll);

module.exports = router;
