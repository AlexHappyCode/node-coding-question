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

  bcrypt.compare(password, hashedPW, async (err, isCorrect) => {
    if (isCorrect) {
      let result = await account.getAccountId(email);
      let { id: accountId } = result;
      createJWT(res, accountId);
      res.render('index', { 
        title: 'my coding submission!',
        LoggedIn: true
      });
    } else {
      return res.status(401).json({ msg: 'incorrect password' });
    }
  });
});

/* Helper function for login 
  creats JWT and sets cookie */
function createJWT(res, accountId) {
  const accessToken = JWT.sign(accountId, process.env.ACCESS_TOKEN_SECRET);
  res.cookie('accessToken', accessToken, { httpOnly: true });

    /* we are using cookies instead auth header for now */
  //res.status(200).json({ accessToken: accessToken });
}

module.exports = router;
