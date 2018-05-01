var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var indexRouter = require('../routes/index');

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

exports.apptracker_get = function(req, res, next){
  if(req.session.email == null){
    res.redirect('/logout');
  }
  else{
    res.render('apptracker', { title: 'TrackMyPath' });
  }
};