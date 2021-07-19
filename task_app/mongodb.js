"use strict";

//CRUD (create, read, update and delete)
//See possible methods in mongodb-methods.js

const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-app";

//ObjectId() stores buffer which is smaller than a string
const id = new ObjectId();
const idString = id.toHexString();
// console.log(id.id.length);
// console.log(idString.length);

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) return console.log("Unable to connect to the database!");

    const db = client.db(databaseName);
  }
);
