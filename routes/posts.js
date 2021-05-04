/* File: router/posts.js
   Purpose: posts router file */

const express = require('express');
const router  = express.Router();
const JWT     = require('jsonwebtoken');
const posts   = require('../db/posts');

router.post('/createPost', async (req, res) => {
  let data = [req.body.accountId, req.body.text];
  let photo;

  // if user uploaded photo, grab it here
  if (req.files && req.files.image) {
    let { image }  = req.files;
    photo = true;
    // uploads photo in photo folder
    let path = './photos/' + image.name;
    image.mv(path);
    data.push(path);
  } 

  // if photo exists then createPostWithPhoto
  photo ? posts.createPostWithPhoto(data) : posts.createPost(data);
  res.status(200).json({ msg: 'created a post' });
});

module.exports = router;
