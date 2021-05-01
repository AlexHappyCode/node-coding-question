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
    for (let key in req.files) {
      if (i == 5) break;
      let file = req.files[key];
      
      console.log(file);
      // Check if it is an image file
      if (file.mimetype.includes('image')) {
        let { id: photoId }= await posts.insertPhoto(postId);
        
        let path = './photos/' + photoId + '_' + file.name ;
        posts.setPhotoPath(postId, path);
        file.mv(path);
      } else {
        console.log('file is not an image');
        continue;
      }
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
