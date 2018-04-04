var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/login');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Track My Path' });
});

router.get('/login/signup', function(req, res, next){
  res.render('signup', { title: 'Track My Path' });
});

router.get('/home', function(req, res, next){
  res.render('home', { title: 'Track My Path' });
});

router.get('/resumebuilder', function(req, res, next){
  res.render('resumebuilder', { title: 'Track My Path' });
});

router.get('/interests', function(req, res, next){
  res.render('interests', { title: 'Track My Path' });
});

router.get('/apptracker', function(req, res, next){
  res.render('apptracker', { title: 'Track My Path' });
});

module.exports = router;
