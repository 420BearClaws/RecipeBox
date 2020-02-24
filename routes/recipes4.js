const express = require('express');
const router = express.Router();

router.get('/recipes4', function(req, res, next) {
  res.render('recipes4', { title: 'Roasted Asparagus' });
});

module.exports = router;
