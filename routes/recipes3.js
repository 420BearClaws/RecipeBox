const express = require('express');
const router = express.Router();

router.get('/recipes3', function(req, res, next) {
  res.render('recipes3', { title: 'Curried Chicken Salad' });
});

module.exports = router;

