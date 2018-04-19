var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "trackMyPath"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

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
  con.query('SELECT * FROM users WHERE email=? AND password=?',[req.body.username, req.body.password], function(err,result){
    if(result[0]){
      req.session.authenticated = true;
      req.session.user = req.body.username;
      res.redirect('/home');
    } else {
      req.flash('error', 'Username and password are incorrect');
      res.redirect('/login');
    }
  })
});

router.get('/login/signup', function(req, res, next){
  res.render('signup', { title: 'Track My Path' });
});

router.post('/login/signup', function(req, res, next){
  if(req.body.firstname && req.body.lastname && req.body.email && req.body.password && req.body.grade) {
    var sql = "INSERT INTO users (first_name, last_name, email, password, grade) VALUES (?,?,?,?,?)";
    con.query(sql,[req.body.firstname, req.body.lastname, req.body.email, req.body.password, req.body.grade], function(err,result){
      if(err){
        req.flash('error', 'Username and password are incorrect');
        res.redirect('/login/signup');
      } else {
        req.session.authenticated = true;
        req.session.user = req.body.email;
        res.redirect('/home');
      }
    })
  }
  else{
    res.render('signup', { title: 'Track My Path' });
  }
});

router.get('/home', function(req, res, next){
  res.render('home', { title: 'Track My Path' });
  console.log("User currently logged in: " + req.session.user);
});

router.get('/resumebuilder', resume_controller.resumebuilder_get);

router.get('/interests', interests_controller.interests_get);

router.get('/apptracker', app_controller.apptracker_get);

router.get('/logout', function (req, res, next) {
  delete req.session.authenticated;
  res.redirect('/');
});

module.exports = router;
