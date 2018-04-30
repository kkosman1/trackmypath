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

// Display details for a specific category
exports.categoryinstance_detail = function(req, res, next) {
    //CategoryInstance.findById(req.params.id)
    //.populate('category')
    //.exec(function (err, categoryinstance) {
    //  if (err) { return next(err); }
    //  if (categoryinstance==null) { // No results.
    //      var err = new Error('Category copy not found');
    //      err.status = 404;
    //      return next(err);
    //    }
      // Successful, so render.
      res.render('categoryinstance_detail', { title: 'Category:', categoryinstance:  req.params.id});
    //})
  };