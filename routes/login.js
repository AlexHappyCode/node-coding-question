var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const account = require('../db/account');

  /* POST: Login */
router.post('/', async (req, res, next) => {
  let { email, password } = req.body;

  result = await account.getHashedPassword(email);
  if (!result) {
    return res.status(500).json({ 
      msg: 'error password undefined, likely user does not exist.' });
  }
  let { password: hashedPW } = result;

  return res.status(200).json({ msg: 'testing login' });
});

module.exports = router;
