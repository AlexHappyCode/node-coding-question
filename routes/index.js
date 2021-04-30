var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // TODO currently loggedIn is not working because
  // it serializes only when creating a post
  let loggedIn;
  console.log(req.accountId);
  req.accountId ? loggedIn = true : loggedIn = false;
  console.log(loggedIn);

  res.render('index', { 
    title: 'my coding submission!',
    loggedIn: loggedIn
  });
});

module.exports = router;
