var express = require('express');
var router = express.Router();


router.get('/publicrecipes', function(req, res, next) {
  res.render('publicrecipes', { title: 'Public Recipes' });
});

module.exports = router;