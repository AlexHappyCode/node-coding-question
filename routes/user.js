var express = require('express');
var router = express.Router();
const accounts = require('../db/account');

router.put('/setUsername', async (req, res) => {
  let accountId = req.accountId;
  let { username } = req.body;

  accounts.setUsername([username, accountId]);

  res.status(200).json({ msg: 'setting username' });
});

module.exports = router;
