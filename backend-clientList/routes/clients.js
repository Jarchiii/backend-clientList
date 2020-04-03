var express = require('express');
var router = express.Router();
const clientModel = require('../models/Client');
const uploader = require('../config/cloudinary-setup');



/* CREATE a client. */
router.post('/clients', function(req, res, next) {
    clientModel
    .create(req.body)
    .then((client) => res.status(200).json(client))
    .catch(next);
  });

  /* import client. */
router.post('/clientsImport',uploader.single('fileUrl'), function(req, res, next) {
  if (!req.file) {
		next(new Error('No file uploaded!'));
		return;
	}

  clientModel
  .create(req.body)
  .then((client) => res.status(200).json(client))
  .catch(next);
});

/* GET clients listing. */
router.get('/clients', function(req, res, next) {
  clientModel
  .find()
  .then((clients) => res.status(200).json(clients))
  .catch(next);
});

/* GET  a client */
router.get('/clients/:id', function(req, res, next) {
  clientModel.findById(req.params.id)
  .then((client) => res.status(200).json(client))
  .catch(next);
});

/* PATCH  a client  */
router.patch('/clients/:id', function(req, res, next) {
  const updatedUser = req.body
  clientModel
  .findByIdAndUpdate(req.params.id, updatedUser)
  .then((client) => res.status(200).json(client))
  .catch(next);
});

/* DELETE  a user  */
router.delete('/clients/:id', function(req, res, next) {
  clientModel
  .findByIdAndDelete(req.params.id)
  .then((client) => res.status(200).json(client))
  .catch(next);
});




module.exports = router;