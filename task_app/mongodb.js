"use strict";

//CRUD (create, read, update and delete)

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

    //---------------DELETE----------------\

    //Users collection

    db.collection("users")
      .deleteMany({ age: 32 })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));

    //Tasks collection

    db.collection("tasks")
      .deleteOne({ completed: false })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  }
);

//---------------CREATE----------------

//Users collection

// db.collection("users").insertOne(
//   {
//     _id: id,
//     name: "Anna",
//     age: 21,
//   },
//   (error, result) => {
//     if (error) return console.log("Unable to insert user!");

//     console.log(`Document was inserted with an id: ${result.insertedId}`);
//   }
// );

//     db.collection("users").insertMany(
//       [
//         {
//           name: "Jen",
//           age: 28,
//         },
//         {
//           name: "Jack",
//           age: 35,
//         },
//       ],
//       (error, result) => {
//         if (error) return console.log("Unable to insert users!");

//         const ids = Object.values(result.insertedIds);
//         for (let element of ids) {
//           console.log(`Document was inserted with an id: ${element}`);
//         }
//       }
//     );

//Tasks collection

// db.collection("tasks").insertMany(
//   [
//     {
//       description: "Buy groceries",
//       completed: true,
//     },
//     {
//       description: "Go running",
//       completed: true,
//     },
//     {
//       description: "Washing up",
//       completed: false,
//     },
//   ],
//   (error, result) => {
//     if (error) return console.log("Unable to insert users!");

//     const ids = Object.values(result.insertedIds);
//     for (let element of ids) {
//       console.log(`Document was inserted with an id: ${element}`);
//     }
//   }
// );

//---------------READ----------------

//Users collection

// db.collection("users").findOne(
//   { _id: new ObjectId("60f5810c25496c29cb2b2b38") },
//   (error, user) => {
//     if (error) return console.log("Unable to find user!");

//     console.log(user);
//   }
// );

//     db.collection("users")
//       .find({ age: 28 })
//       .toArray((error, users) => {
//         console.log(users);
//       });

//     db.collection("users")
//       .find({ age: 28 })
//       .count((error, count) => {
//         console.log(count);
//       });

//Tasks collection

// db.collection("tasks").findOne(
//   { _id: new ObjectId("60f5791aa27b38894dd4248b") },
//   (error, task) => {
//     if (error) return console.log("Couldn't find task");

//     console.log(task);
//   }
// );

// db.collection("tasks")
//   .find({ completed: false })
//   .toArray((error, tasks) => {
//     console.log(tasks);
//   });

//---------------UPDATE----------------

//Users collection

// db.collection("users")
//   .updateOne(
//     {
//       _id: new ObjectId("60f5810c25496c29cb2b2b38"),
//     },
//     {
//       $set: {
//         name: "Anna",
//       },
//       $inc: {
//         age: 4, //Can be a negative number
//       },
//     }
//   )
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(console.error());
//  });

//Tasks collection

//     db.collection("tasks")
//       .updateMany(
//         { completed: true },
//         {
//           $set: {
//             byWhom: "Liza",
//           },
//         }
//       )
//       .then((result) => console.log(result))
//       .catch((error) => console.log(error))
//       .finally(console.log("Everything is done"));
