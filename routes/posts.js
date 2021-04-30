/* File: router/posts.js
   Purpose: posts router file */

const express = require('express');
const router  = express.Router();
const JWT     = require('jsonwebtoken');
const posts   = require('../db/posts');

/* TODO handle photos */
router.post('/createPost', async (req, res) => {
  let data = [req.body.accountId, req.body.text];
  posts.createPost(data);
  res.status(200).json({ msg: 'created a post' });
});

router.post('/uploadPhoto', async (req ,res) => {
  //let data.req.body
});

module.exports = router;
