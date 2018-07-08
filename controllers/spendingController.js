const db = require("../models");

// Defining methods for the spendingController
module.exports = {
  findAll: function(req, res) {
    db.Spending
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Spending
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Spending
      .create(req.body)
      .then(dbModel => { 
        console.log(dbModel)
        res.json(dbModel)
      })
      .catch(err => { 
        console.log(err)
        res.status(422).json(err)
      });
  },
  update: function(req, res) {
    db.Spending
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Spending
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};