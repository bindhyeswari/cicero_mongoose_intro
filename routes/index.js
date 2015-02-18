var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', function (err) {
  if (err) console.log('could not connect to mongodb ...');
  else console.log('Successfully connected to mongodb ... ');
});

var ContactModel = mongoose.model('Contact', {
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  location: String });

// RESTful API

router.post('/contacts', function (req, res) {
  (new ContactModel(req.body)).save(function (err, result) {
    if (err) res.status(500).json({ message: 'Sorry! Something broke!' });
    else res.status(201).json(result)
  });
});

router.get('/contacts', function(req, res) {
    ContactModel.find(function (err, result) {
      if (err) res.status(500).json({ message: 'Sorry! Something broke!' });
      else res.status(201).json(result)
    });
});

router.put('/contacts/:id', function (req, res) {
  ContactModel.findByIdAndUpdate(req.params.id, req.body, function (err, result){
      if (err) res.status(500).json({ message: 'Sorry! Something broke!' });
      else res.status(200).json(result);
  });
});

router.delete('/contacts/:id', function (req, res) {
  ContactModel.findByIdAndRemove(req.params.id, function (err, result){
    if (err) res.status(500).json({ message: 'Sorry! Something broke!' });
    else res.status(200).json(result);
  });
});




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
