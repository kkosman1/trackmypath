var express = require('express');
var router = express.Router();

//controllers
var resume_controller = require('../controllers/resumebuilderController');
var interests_controller = require('../controllers/interestsController');
var app_controller = require('../controllers/apptrackerController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/login');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Track My Path' });
});

router.post('/login', function(req, res, next){
  		// you might like to do a database look-up or something more scalable here
      if (req.body.username && req.body.username === 'user' && req.body.password && req.body.password === 'pass') {
        req.session.authenticated = true;
        req.session.user = req.body.username;
        res.redirect('/home');
      } else {
        req.flash('error', 'Username and password are incorrect');
        res.redirect('/login');
      }
});

router.get('/login/signup', function(req, res, next){
  res.render('signup', { title: 'Track My Path' });
});

router.get('/home', function(req, res, next){
  res.render('home', { title: 'Track My Path' });
  console.log("User currently logged in: " + req.session.user);
});

router.get('/resumebuilder', resume_controller.resumebuilder_get);

router.get('/interests', interests_controller.interests_get);

router.get('/apptracker', app_controller.apptracker_get);

module.exports = router;
