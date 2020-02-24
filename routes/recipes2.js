const express = require('express');
const router = express.Router();

router.get('/recipes2', function(req, res, next) {
  res.render('recipes2', { title: 'Homestyle Pizza' });
});

module.exports = router;

    

   