var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const account = require('../db/account');

  /* POST: Register */
router.post('/', async (req, res, next) => {
  let { email, password } = req.body;

  hashedPW = await account.getHashedPassword(email);
  console.log(hashedPW);
  return res.status(200).json({ msg: 'testing login' });
});

module.exports = router;
