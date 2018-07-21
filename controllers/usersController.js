const db = require("../models");

// Defining methods for the usersController
module.exports = {
  findAll: function (req, res) {
    db.User
      .find({})
      // .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  userLogin: function (req, res) {
    db.User
      .findOne(
        { userEmail: req.params.userLogin })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  createUser: function (req, res) {
    console.log(req)
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err =>
        console.log(err)
        // res.status(422).json(err)
      );
  },

  transaction: function (req, res) {
    db.User
      .findOneAndUpdate({ userEmail: req.body.userLogin }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err =>
        console.log(err)
        // res.status(422).json(err)
      );
  },
  pastBuys: function (req, res) {
    db.Transaction
      .find({
        userEmail: req.params.userLogin,
        transactionType: 'buy'
      })
      .limit(3)
      .sort({ date: 'descending' })
      .then(dbModel => {
        res.json(dbModel)
      })
      .catch(err => console.log(err));
  },
  pastSells: function (req, res) {
    db.Transaction
      .find({
        userEmail: req.params.userLogin,
        transactionType: 'sell'
      })
      .limit(3)
      .sort({ date: 'descending' })
      .then(dbModel => {
        res.json(dbModel)
      })
      .catch(err => console.log(err));
  },
  postTransaction: function (req, res) {
    console.log("in postTransaction")
    console.log(req);
    db.Transaction
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err =>
        console.log(err)
        // res.status(422).json(err)
      );
  }
  // remove: function(req, res) {
  //   db.Book
  //     .findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }
};
