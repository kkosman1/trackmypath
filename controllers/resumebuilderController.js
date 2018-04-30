//var CategoryInstance = require('../node_modules/categoryinstance')
//var Category = require('../node_modules/category')

//const { body,validationResult } = require('express-validator/check');
//const { sanitizeBody } = require('express-validator/filter');

// Display  of all the categories (service, )
exports.resumebuilder_get = function(req, res) {
      res.render('resumebuilder', { title: 'Track My Path' });
};

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
