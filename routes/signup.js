var express = require("express");
var router = express.Router();
var User = require("../models/user.js");
var mid = require("../middleware/middleware.js");

// GET /signup
router.get("/signup", mid.loggedOut, function(req, res, next) {
  res.render("signup", { title: "Create An Account" });
});

// POST /signup
router.post("/signup", function(req, res, next) {
  if (
    req.body.email &&
    req.body.name &&
    req.body.favoriteRecipe &&
    req.body.password &&
    req.body.confirmPassword
  ) {
    // confirm passwords match
    if (req.body.password !== req.body.confirmPassword) {
      var err = new Error("Passwords do not match.");
      err.status = 400;
      return next(err);
    }
    //create object with form input
    var userData = {
      email: req.body.email,
      name: req.body.name,
      favoriteRecipe: req.body.favoriteRecipe,
      password: req.body.password
    };

    //use create to insert doc into mongo

    User.create(userData, function(error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect("/profile");
      }
    });
  }
});

module.exports = router;
