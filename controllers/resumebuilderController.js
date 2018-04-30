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

exports.resumebuilder_get = function(req, res){

    con.query('SELECT category FROM resumeBuilder WHERE email=? AND active=1',[req.session.email], function(err,result){
        if(result[0]){
            var categories = [];

            Object.keys(result).forEach(function(key) {
                var row = result[key];
                categories.push(row.category);
            });
            console.log(categories);

            res.render('resumebuilder', { title: 'Track My Path', categories: categories });

        } else {
            res.redirect('/login');
        }
    })
}