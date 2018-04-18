var express = require('express');
var router = express.Router();

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
  //res.redirect('/home');
});

router.get('/login/signup', function(req, res, next){
  res.render('signup', { title: 'Track My Path' });
});

router.get('/home', function(req, res, next){
  res.render('home', { title: 'Track My Path' });
  console.log("User currently logged in: " + req.session.user);
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
