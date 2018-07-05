const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

let testWallet = {
  cash: 12000,
  BTC: 388,
  XRP: 952
}

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/cryptotransactions",
  {
    useMongoClient: true
  }
);

const userSeed = [
  {
    userName: "user string 1",
    userEmail: "user email 1",
    wallet: JSON.stringify(testWallet)
  },
  {
    userName: "user string 2",
    userEmail: "user email 2",
    wallet: JSON.stringify(testWallet)
  },
  {
    userName: "user string 3",
    userEmail: "user email 3",
    wallet: JSON.stringify(testWallet)
  },
  {
    userName: "user string 4",
    userEmail: "user email 4",
    wallet: JSON.stringify(testWallet)
  },
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
