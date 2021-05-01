/* File: router/posts.js
   Purpose: posts router file */

const express = require('express');
const router  = express.Router();
const JWT     = require('jsonwebtoken');
const posts   = require('../db/posts');

router.post('/createPost', async (req, res) => {
  let data = [req.body.accountId, req.body.text];
  let { id: postId } = await posts.createPost(data);

  // if user uploaded photos, grab them here
  if (req.files) {
    let i = 0;
    for (let key in req.files) {
      if (i == 5) break;
      let file = req.files[key];
      
      //console.log(file);
      // Check if it is an image file
      if (file.mimetype.includes('image')) {
        let { id: photoId }= await posts.insertPhoto(postId);

        console.log(photoId);
        
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
  res.status(200).json({ msg: 'created a post' });
});

/* edit text of post */
router.put('/setText', (req, res) => {
  let { postId, text } = req.body;
  let data = [text, postId];
  posts.setText(data);
  res.status(200).json({ msg: 'set the post text' });
});

/* delete photo */
router.delete('/deletePhoto', (req, res) => {
  let { photoId } = req.body;
  posts.deletePhoto(photoId);
  res.status(200).json({ msg: 'deleted photo' });
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




module.exports = router;
