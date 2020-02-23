var express = require("express");
var router = express.Router();

router.get("/signup", function(req, res, next) {
  res.render("signup", { title: "Create An Account" });
});

module.exports = router;
