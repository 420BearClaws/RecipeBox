var express = require("express");
var router = express.Router();
var User = require("../models/user.js");
var mid = require("../middleware/middleware.js");

// GET /profile
router.get("/profile", mid.requiresLogin, function(req, res, next) {
  User.findById(req.session.userId).exec(function(error, user) {
    if (error) {
      return next(error);
    } else {
      return res.render("profile", {
        title: "Profile",
        name: user.name,
        favorite: user.favoriteRecipe
      });
    }
  });
});

module.exports = router;
