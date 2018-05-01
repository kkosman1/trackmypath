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

    con.query('SELECT DISTINCT category FROM resumeBuilder WHERE email=? AND active=1',[req.session.email], function(err,result){
        if(result[0]){
            var categories = [];

            Object.keys(result).forEach(function(key) {
                var row = result[key];
                categories.push(row.category);
            });
            console.log(categories);

            res.render('resumebuilder', { title: 'TrackMyPath', categories: categories });

        } else {
            res.redirect('/logout');
        }
    })
}

// Display details for a specific category
exports.categoryinstance_detail = function(req, res, next) {
    if(req.session.email == null){
        res.redirect('/logout');
    }
    con.query('SELECT item, item_time, item_desc FROM resumeBuilder WHERE email=? AND category=? AND active=1 AND item_active=1',[req.session.email, req.params.id], function(err,result){
        if(result[0]){
            var items = [];

            Object.keys(result).forEach(function(key) {
                var row = result[key];
                items.push(row);
            });
            console.log(items);

            res.render('categoryinstance_detail', { title: 'TrackMyPath', items: items, category: req.params.id });

        } else {
            res.render('categoryinstance_detail', { title: 'TrackMyPath', category: req.params.id});        }
    })
  };

exports.resumebuilder_post = function(req, res){

    if(req.body.categoryname) {
        var sql = "INSERT INTO resumeBuilder (email, category, cat_desc) VALUES (?,?,?)";
        con.query(sql,[req.session.email, req.body.categoryname, req.body.categorydescription], function(err,result){
          if(err){
            console.log("ERROR:" + err);
            res.redirect('/resumeBuilder');
          } else {
            res.redirect('/resumeBuilder');
          }
        })
      }
      else{
        res.redirect('/resumeBuilder');
      }
}

exports.categoryinstance_post = function(req, res){
    if(req.body.itemname) {
        var sql = "INSERT INTO resumeBuilder (email, category, item, item_time, item_desc, item_active) VALUES (?,?,?,?,?,?)";
        con.query(sql,[req.session.email, req.params.id, req.body.itemname, req.body.itemtime, req.body.itemdescription, 1], function(err,result){
            if(err){
            console.log("ERROR:" + err);
            res.redirect('/resumeBuilder/'+req.params.id);
            } else {
            res.redirect('/resumeBuilder/'+req.params.id);          }
        })
        }
        else{
        res.redirect('/resumeBuilder/'+req.params.id);
        } 
}

exports.categoryinstance_post_delete = function(req, res){
    if(req.body.itemname) {
        var sql = "UPDATE resumeBuilder SET item_active=0 WHERE (email, category, item) VALUES (?,?,?)";
        con.query(sql,[req.session.email, req.params.id, req.body.itemname], function(err,result){
            if(err){
            console.log("ERROR:" + err);
            res.redirect('/resumeBuilder/'+req.params.id);
            } else {
            res.redirect('/resumeBuilder/'+req.params.id);          }
        })
        }
        else{
        res.redirect('/resumeBuilder/'+req.params.id);
        } 
}