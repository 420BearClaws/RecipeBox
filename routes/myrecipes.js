var express = require("express");
var router = express.Router();
var mid = require("../middleware/middleware.js");
const userrecipes = require("../models/userrecipes");

/* GET user recipes listing. */
router.get("/myrecipes", mid.requiresLogin, function (req, res, next) {
  res.render("myrecipes", { title: "My Recipes" });

  let recipes_query = userrecipes.find({});
  recipes_query.sort({id});
  let find_promise = recipes_query.exec();
  console.log("Is a Promise: " + (find_promise instanceof Promise));
  find_promise
    .then(userrecipes => {
      res.json(userrecipes);
    })
    .catch(err => {
      console.log("Error.");
    });
});

router.post("/myrecipes", function (req, res, next) {
  console.log(req.body.id)
  const new_recipe = new userrecipes(req.body);

  let save_promise_one = new_recipe.save();
  console.log("Is a promise: " + (save_promise_one instanceof Promise));
  save_promise_one
    .then(saved_recipe => {
      res.json(userrecipes);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
const delete_recipe = evt => {
  userrecipes.findByIdAndDelete(
    { _id: event.target.id },
    (err, deleted_recipe) => {
      if (err) {
        return console.log('Error', err);
      }
      console.log(deleted_recipe);
    });
}

module.exports = router;
