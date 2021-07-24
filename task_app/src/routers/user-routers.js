"use strict";

const express = require("express");
const User = require("../models/user.js");
const auth = require("../middleware/auth.js");
const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, callback) {
    const typeValidation = ["jpg", "jpeg", "png"].some((format) =>
      file.originalname.endsWith(format)
    );

    if (!typeValidation)
      return callback(new Error("Please upload a .jpg, .jpeg or .png file"));

    callback(undefined, true);
  },
});

const {
  addUser,
  getUserProfile,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  logoutAll,
  uploadFile,
  errorHandler,
  deleteAvatar,
} = require("../controllers/user-controller.js");

const router = new express.Router();

router.post("/users", addUser);
router.get("/users/me", auth, getUserProfile);
router.patch("/users/me", auth, updateUser);
router.delete("/users/me", auth, deleteUser);
router.post("/users/login", loginUser);
router.post("/users/logout", auth, logoutUser);
router.post("/users/logoutAll", auth, logoutAll);
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  uploadFile,
  errorHandler
);
router.delete("/users/me/avatar", auth, deleteAvatar);

module.exports = router;
