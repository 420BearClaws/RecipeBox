var express = require("express");
var router = express.Router();

router.get("/myrecipes", function(req, res, next) {
  res.render("myrecipes", { title: "My Recipes" });
});

module.exports = router;
