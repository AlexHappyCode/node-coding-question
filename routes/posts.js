/* File: router/posts.js
   Purpose: posts router file */

const express = require('express');
const router  = express.Router();
const JWT     = require('jsonwebtoken');
const posts   = require('../db/posts');

router.post('/createPost', async (req, res) => {
  let data = [req.body.accountId, req.body.text];
  let { image: photo }  = req.files;

  if (photo) {
    // puts photo in photo folder
    photo.mv('./photos/' + photo.name);
  }

  posts.createPost(data);
  res.status(200).json({ msg: 'created a post' });
});

module.exports = router;
