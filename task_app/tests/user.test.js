"use strict";

const request = require("supertest");
const app = require("../src/app.js");

test("Should create a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Liza",
      email: "littled685@gmail.com",
      password: "123456",
    })
    .expect(201);
});
