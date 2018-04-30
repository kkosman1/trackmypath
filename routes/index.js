var express = require('express');
var router = express.Router();
var mysql = require('mysql');

const jsdom = require("jsdom");
const { window } = new jsdom.JSDOM(`...`);
var $ = require("jquery")(window);

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "admin",
//   database: "trackMyPath"
// });

var con = mysql.createConnection({
  host: "trackmypath.cycosjtwm6yd.us-east-2.rds.amazonaws.com",
  port: 3306,
  user: "root",
  password: "admin123",
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
      req.session.email = req.body.username;
      req.session.user = result[0].first_name + " " + result[0].last_name;
      res.redirect('/home');
    } else {
      res.render('login', { title: 'Track My Path', error: 'Username/password is incorrect'});
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
        console.log("ERROR:" + err);
        res.redirect('/login/signup');
      } else {
        req.session.authenticated = true;
        req.session.email = req.body.email;
        req.session.user = req.body.firstname + " " + req.body.lastname;
        res.redirect('/home');
      }
    })
  }
  else{
    console.log("here");
    res.render('signup', { title: 'Track My Path' });
  }
});

router.get('/home', function(req, res, next){
  console.log("User currently logged in: " + req.session.user);

  // Set grade progress bar to correct grade
  con.query('SELECT grade FROM users WHERE email=?',[req.session.email], function(err,result){
    if(result[0]){
      console.log("Grade: " + result[0].grade);
      switch(result[0].grade){
        case "9":
          res.render('home', { grade: "45", title: 'Track My Path', username: req.session.user });
          break;
        case "10":
          res.render('home', { grade: "65", title: 'Track My Path', username: req.session.user });
          break;
        case "11":
          res.render('home', { grade: "80", title: 'Track My Path', username: req.session.user });
          break;
        case "12":
          res.render('home', { grade: "100", title: 'Track My Path', username: req.session.user });
          break;
        case "Junior High":
          res.render('home', { grade: "30", title: 'Track My Path', username: req.session.user });
          break;
        case "Elementary School":
          res.render('home', { grade: "15", title: 'Track My Path', username: req.session.user });
          break;
        default:
          res.render('home', { grade: "0", title: 'Track My Path', username: req.session.user });
          break;
      }
    } else {
      req.flash('error', 'Username is incorrect');
      res.redirect('/login');
    }
  })
});

router.get('/resumebuilder', resume_controller.resumebuilder_get);

router.get('/interests', interests_controller.interests_get);

router.get('/apptracker', app_controller.apptracker_get);

router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
