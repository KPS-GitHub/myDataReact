// const mongoose = require("mongoose");
// const db = require("../models");
// const moment = require("moment");
// mongoose.Promise = global.Promise;

// // This file empties the Books collection and inserts the books below

// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost:27017/myDataDB",
//   {
//     useMongoClient: true
//   }
// );

// const testSeed = [
//   {
//     amount: 5,
//     category: "coffee",
//     date: "6-Jun-18",
//     userID: sessionStorage.userID
//   },
//   {
//     amount: 3,
//     category: "coffee",
//     date: "13-Jun-18",
//     userID: sessionStorage.userID
//   },
//   {
//     amount: 5,
//     category: "coffee",
//     date: "14-Jun-18",
//     userID: sessionStorage.userID
//   },
//   {
//     amount: 5,
//     category: "coffee",
//     date: "16-Jun-18",
//     userID: sessionStorage.userID
//   },
//   {
//     amount: 3,
//     category: "coffee",
//     date: "17-Jun-18",
//     userID: sessionStorage.userID
//   },
//   {
//     amount: 5,
//     category: "coffee",
//     date: "22-Jun-18",
//     userID: sessionStorage.userID
//   },
//   {
//     amount: 3,
//     category: "coffee",
//     date: "30-Jun-18",
//     userID: sessionStorage.userID
//   },
//   {
//     amount: 5,
//     category: "coffee",
//     date: "3-Jul-18",
//     userID: sessionStorage.userID
//   },
//   {
//     amount: 5,
//     category: "coffee",
//     date: "4-Jul-18",
//     userID: sessionStorage.userID
//   }
// ];

// db.Spending
//   .remove({})
//   .then(() => db.Spending.collection.insertMany(testSeed))
//   .then(data => {
//     console.log(data.insertedIds.length + " records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });
