var express = require('express');
var router = express.Router();
const userModel = require('../models/User');


/* GET users listing. */
router.get('/users', function(req, res, next) {
  userModel
  .find()
  .then((users) => res.status(200).json(users))
  .catch(next);
});

/* GET  a user  */
router.get('/users/:id', function(req, res, next) {
  userModel.findById(req.params.id)
  .then((user) => res.status(200).json(user))
  .catch(next);
});

/* PATCH  a user  */
router.patch('/users/:id', function(req, res, next) {
  const updatedUser = req.body
  userModel
  .findByIdAndUpdate(req.params.id, updatedUser)
  .then((user) => res.status(200).json(user))
  .catch(next);
});

/* DELETE  a user  */
router.delete('/users/:id', function(req, res, next) {
  userModel
  .findByIdAndDelete(req.params.id)
  .then((user) => res.status(200).json(user))
  .catch(next);
});




module.exports = router;