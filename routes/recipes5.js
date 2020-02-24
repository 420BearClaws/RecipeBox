const express = require('express');
const router = express.Router();

router.get('/recipes5', function(req, res, next) {
  res.render('recipes5', { title: 'Blueberry Oatmeal Squares' });
});

module.exports = router;
