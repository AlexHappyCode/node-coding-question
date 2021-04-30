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
  let credentials = [
    req.body.name,
    req.body.email,
  ];
  let salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  credentials.push(hashedPassword);

  let error = await account.insertAccount(credentials);
  if (error) {
    return res.status(500).json({ msg: 'Error, email probably exists' });
  }
  res.status(200).json({ msg: 'created an account' });
});

module.exports = router;
