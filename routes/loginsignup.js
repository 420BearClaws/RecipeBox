var express = require('express');
var router = express.Router();


router.get('/loginorsignup', function(req, res, next) {
  res.render('loginsignup', { title: 'Login or Create An Account' });
});

module.exports = router;