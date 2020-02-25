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

// GET /login
router.get("/login", function(req, res, next) {
  res.send("login", { title: "Login" });
});

// POST /login
router.post("/login", function(req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function(error, user) {
      if (error || !user) {
        var err = new Error("Wrong email or password.");
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect("/profile");
      }
    });
  } else {
    var err = new Error("Email and password are required.");
    err.status = 401;
    return next(err);
  }
});

// GET /signup
router.get("/signup", function(req, res, next) {
  res.render("signup", { title: "Create An Account" });
});

// POST /signup
router.post("/signup", function(req, res, next) {
  if (
    req.body.email &&
    req.body.name &&
    req.body.favoriterecipe &&
    req.body.password &&
    req.body.confrimPassword
  ) {
    if (req.body.password !== req.body.confirmPassword) {
      var err = new Error("Password do not match.");
      err.status = 400;
      return next(err);
    }

    var userData = {
      email: req.body.email,
      name: req.body.name,
      favoriterecipe: req.body.favoriterecipe,
      password: req.body.password
    };

    User.create(userData, function(error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect("/profile");
      }
    });
  } else {
    var err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
});
module.exports = router;
