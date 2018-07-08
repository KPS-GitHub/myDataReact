// const mongoose = require("mongoose");
// const db = require("../models");
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
//     amount: 100,
//     category: "Books",
//     date: new Date(Date.now())
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
