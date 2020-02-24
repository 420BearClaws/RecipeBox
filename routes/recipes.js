const express = require('express');
const router = express.Router();

router.get('/recipes', function(req, res, next) {
  res.render('recipes', { title: 'Crock Pot Roast' });
});

module.exports = router;