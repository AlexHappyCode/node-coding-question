var express   = require('express');
var router    = express.Router();
const bcrypt  = require('bcrypt');
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

  bcrypt.compare(password, hashedPW, (err, isCorrect) => {
    if (isCorrect) {
      return res.status(200).json({ msg: 'successful login' });
    } else {
      return res.status(401).json({ msg: 'incorrect password' });
    }
  });
});

module.exports = router;
