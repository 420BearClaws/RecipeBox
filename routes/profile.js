var express = require("express");
var router = express.Router();
var User = require("../models/user");

// GET /profile
router.get("/profile", function(req, res, next) {
  if (!req.session.userID) {
    var err = new Error("You are not authorized to view this page.");
    err.status = 403;
    return next(err);
  }
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
