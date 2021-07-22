"use strict";

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("Age must be a positive number");
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Enter a valid email!");
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password"))
        throw new Error("The password can't contain the word 'password'");
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, "thisisanewuser");

  this.tokens = this.tokens.concat({ token });
  await this.save();

  return token;
};

//Methods are called on an instance, statics are called on a class
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("There is no user with such email");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Wrong password. Please, try again");

  return user;
};

//Hash the password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 8);
  //To end the function!
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
