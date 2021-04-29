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
  console.log(hashedPW);
  console.log('password', password);

  bcrypt.compare(password, hashedPW, (err, result) => {
    if (result) {
      console.log(result);
      return res.status(200).json({ msg: 'successful login' });
    } else {
      console.log(err);
      return res.status(401).json({ msg: 'incorrect password' });
    }
  });
});

module.exports = router;
