var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const account = require('../db/account');

  /* GET: Register */
router.get('/', function(req, res, next) {
  res.render('registration', { title: 'The registration' });
});

  /* POST: Register */
router.post('/', async (req, res, next) => {
  let credentials = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };
  console.log(credentials.password);
  let salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(credentials.password, salt)
  credentials.password = hashedPassword;

  // TODO make sure not duplicate emails
  await account.insertAccount(credentials);
  res.status(200).json({ msg: 'creating an account' });
});

module.exports = router;
