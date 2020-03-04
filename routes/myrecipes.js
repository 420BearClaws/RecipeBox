var express = require("express");
var router = express.Router();
var mid = require("../middleware/middleware.js");
let { userrecipes } = require("../models");

/* GET user recipes listing. */
router.get("/myrecipes", mid.requiresLogin, function(req, res, next) {
  res.render("myrecipes", { title: "My Recipes" });

  let recipes_query = userrecipes.find({});
  recipes_query.sort({ title: 1 });
  let find_promise = recipes_query.exec();
  console.log("Is a Promise: " + (find_promise instanceof Promise));
  find_promise
    .then(myrecipes => {
      res.json(myrecipes);
    })
    .catch(err => {
      console.log("Error.");
    });
});

router.post("/", function(req, res, next) {
  const new_book = new userrecipes(req.body);

  let save_promise_one = new_recipe.save();
  console.log("Is a promise: " + (save_promise_one instanceof Promise));
  save_promise_one
    .then(saved_recipe => {
      res.json(myrecipes);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
