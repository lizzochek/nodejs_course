"use strict";

const request = require("supertest");
const app = require("../src/app.js");

const Task = require("../src/models/task.js");
const {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  setupDb,
} = require("./fixtures/db.js");

//Runs before all tests
beforeEach(setupDb);

test("Should create task for user", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "From my test",
    })
    .expect(201);

  const task = Task.findById(response.body._id);

  expect(task).not.toBeNull();
});

test("Should get users tasks", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body.length).toBe(1);
});

test("Should delete only a user-owned tasks", async () => {
  const response = await request(app)
    .delete(`/tasks`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send(`id=${taskOne._id}`)
    .expect(404);

  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});
