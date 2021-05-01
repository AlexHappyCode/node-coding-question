/* File: router/posts.js
   Purpose: posts router file */

const express = require('express');
const router  = express.Router();
const JWT     = require('jsonwebtoken');
const posts   = require('../db/posts');

router.post('/createPost', async (req, res) => {
  let data = [req.body.accountId, req.body.text];
  let { id: postId } = await posts.createPost(data);

  // if user uploaded photo, grab it here
  if (req.files) {
    //console.log(req.files);

    let i = 0;
    for (let image in req.files) {
      if ( i == 5) break;

      // TODO validate image here
      console.log(image);

      let path = './photos/' + image.name;
      //image.mv(path);
      //posts.insertPhoto([postId, path]);
      i += 1
    }
  } 

    // if photo exists then createPostWithPhoto
  res.status(200).json({ msg: 'created a post' });
});

/* Endpoint that returns the currentTime - dateCreated 
 * postId -> timestamp */
router.get('/timeDifference', async (req, res) => {
  let { postId } = req.body;
  let postAge = await posts.timeDifference(postId);
  res.status(200).json({ 
    msg: 'Here is the age of the post',
    age: postAge 
  });
});

/* Helper function parses time and returns the format
required for postgres */
function parseTimestamp(time) {
}



module.exports = router;
