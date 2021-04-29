const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');
const account = require('../db/account');
const JWT     = require('jsonwebtoken');

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
      createJWT(res, email);
    } else {
      return res.status(401).json({ msg: 'incorrect password' });
    }
  });
});

/* Helper function for login */
function createJWT(res, email) {
  const accessToken = JWT.sign(email, process.env.ACCESS_TOKEN_SECRET);
  res.status(200).json({ accessToken: accessToken });
}

function authenticateToken(req, res, next) {

}

module.exports = router;
