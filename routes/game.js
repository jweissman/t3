var express = require('express');
var router = express.Router();

/* GET tic-tac-toe game*/
router.get('/', function(req, res, next) {
  res.render('game', {
    //dimensions: [3,3]
  });
});

module.exports = router;
