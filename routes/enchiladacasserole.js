const express = require('express');
const router = express.Router();


router.get('/enchiladacasserole', function(req, res, next) {
  res.render('enchiladacasserole', { title: 'Green Chile Chicken Enchilada Casserole' });
});

module.exports = router;