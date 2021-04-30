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
  // TODO handle multiple photos
  /*
  if (req.files && req.files.image) {
    let { image }  = req.files;
    photo = true;
    // uploads photo in photo folder
    let path = './photos/' + image.name;
    image.mv(path);
    data.push(path);
  } 
  */

  //timestamp has to have the format
  // '1999-01-08 04:05:06'

  // if photo exists then createPostWithPhoto
  posts.createPost(data);
  res.status(200).json({ msg: 'created a post' });
});

/* Endpoint that returns the currentTime - dateCreated 
 * postId -> timestamp */
router.get('/timeDifference', async (req, res) => {
  let { postId } = req.body;
  posts.timeDifference(postId);
  res.status(200).json({ msg: 'got time difference' });
});

/* Helper function parses time and returns the format
required for postgres */
function parseTimestamp(time) {
}



module.exports = router;
