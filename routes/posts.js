/* File: router/posts.js
   Purpose: posts router file */

const express = require('express');
const router  = express.Router();
const JWT     = require('jsonwebtoken');
const posts   = require('../db/posts');

/* TODO handle photos */
router.post('/createPost', async (req, res) => {
  let data = [req.body.accountId, req.body.text];
  let image = req.files;
  console.log(image);
  console.log(data);

  posts.createPost(data);
  res.status(200).json({ msg: 'created a post' });
});

router.post('/uploadPhoto', async (req ,res) => {
  console.log('uploadedPhoto');
  console.log(req.files);
  res.send();
});

module.exports = router;
