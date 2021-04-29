var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const account = require('../db/account');

  /* POST: Register */
router.post('/', async (req, res, next) => {
  let { email, password } = req.body.password;

  // get password for given email
});

module.exports = router;
