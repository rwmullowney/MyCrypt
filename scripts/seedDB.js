const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

let testWallet = {
  cash: 12000
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
    wallet: testWallet
  },
  {
    userName: "user string 2",
    userEmail: "user email 2",
    wallet: testWallet
  },
  {
    userName: "user string 3",
    userEmail: "user email 3",
    wallet: testWallet
  },
  {
    userName: "user string 4",
    userEmail: "user email 4",
    wallet: testWallet
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



  const transactionSeed = [
    {
      coin: 'BTC',
      coinID: 1,
      purchasePrice: 1500,
      coinAmount: 0.62,
      userEmail: 'fake@gmail.com',
      date: new Date()
    },
    {
      coin: 'LTC',
      coinID: 2,
      purchasePrice: 1000,
      coinAmount: 3.284,
      userEmail: 'fake@gmail.com',
      date: new Date()
    },
    {
      coin: 'ETH',
      coinID: 512,
      purchasePrice: 350,
      coinAmount: 1.09,
      userEmail: 'rwm@gmail.com',
      date: new Date()
    },
  ];


  db.Transaction
  .remove({})
  .then(() => db.Transaction.collection.insertMany(transactionSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });