/* File: db/posts.js */

let db = require('../config/pg-promise');
let fs = require('fs');


/* creates a post */
exports.createPost = async data => {
  sql = 'INSERT INTO posts(account_id, text, created_at)\
    VALUES($1, $2, NOW())\
    RETURNING id';
  return await db.one(sql, data);
}

/* edit post text */
exports.setText = data => {
  sql = 'UPDATE posts\
    SET text = $1\
    WHERE id = $2';

  db.none(sql, data);
}

/* insert photo */
exports.insertPhoto = async postsId => {
  sql = 'INSERT INTO photos(post_id)\
    VALUES($1) RETURNING id';

  return await db.one(sql, postsId);
}

/* set path of photo */
exports.setPhotoPath = async (photoId, path) => {
  console.log('entering set photo');
  sql = 'UPDATE photos\
    SET path = $1\
    WHERE id = $2';

  await db.none(sql, [path, photoId]);
}

/* delete photo */
exports.deletePhoto = async photoId => {
  // first delete the photo in the filesystem
  sql = 'SELECT path from photos\
  WHERE id = $1';

  let { path } = await db.one(sql, photoId);
  console.log('path:', path);

  fs.unlinkSync(path);

  // then delete photo from database
  sql = 'DELETE FROM photos\
    WHERE id = $1';

  db.none(sql, photoId);
}

/* get time difference */
exports.timeDifference = async postId => {
  let getPostCreatedAt = 'SELECT created_at FROM posts\
    WHERE id = $1';

  let { created_at: timestampPost } = await db.one(getPostCreatedAt, postId);

  let sql = 'SELECT age(now(), $1)';
  let { age } = await db.one(sql, timestampPost);
  return age;
}


