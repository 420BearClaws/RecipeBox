var express = require('express');
var router = express.Router();


router.get('/publicrecipes', function(req, res, next) {
  res.render('publicrecipes', { title: 'Public Recipes' });
});

function find_all_recipes() {
  userrecipes.find({isPublic}, (err, userrecipes) => {
    if (isPublic = true) {
      return res.render("userrecipe", {userrecipes});
    }
    else {
      return console.log("Error:", err);
    };
  })
};

module.exports = router;