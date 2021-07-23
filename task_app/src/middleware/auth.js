"use strict";

const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authentication").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisisanewuser");

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) throw new Error();

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;