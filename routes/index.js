var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/login');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Track My Path' });
});

router.get('/home', function(req, res, next){
  res.render('home');
});

router.get('/resumebuilder', function(req, res, next){
  res.render('resumebuilder');
});

router.get('/interests', function(req, res, next){
  res.render('interests');
});

router.get('/apptracker', function(req, res, next){
  res.render('apptracker');
});

module.exports = router;
