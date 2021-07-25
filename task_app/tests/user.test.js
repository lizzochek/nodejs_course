"use strict";

const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const app = require("../src/app.js");
const User = require("../src/models/user.js");

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: "Anna",
  email: "anna@example.com",
  password: "1234567",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

//Runs before all tests
beforeEach(async () => {
  //Delete all users
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should create a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Liza",
      email: "littled@gmail.com",
      password: "123456",
    })
    .expect(201);
});

test("Should login existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("Shouldn't login non-existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "hello@gmail.com",
      password: "sayhello",
    })
    .expect(400);
});

test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile for not authenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete an account", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not delete profile for not authenticated user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});
