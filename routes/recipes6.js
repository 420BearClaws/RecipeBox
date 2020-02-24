const express = require('express');
const router = express.Router();

router.get('/recipes6', function(req, res, next) {
  res.render('recipes6', { title: "Granny's Oatmeal Cookies" });
});

module.exports = router;
