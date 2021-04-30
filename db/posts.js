/* File: db/posts.js */

db = require('../config/pg-promise');

/* creates a post */
exports.createPost = async data => {
  sql = 'INSERT INTO posts(account_id, text, created_at)\
    VALUES($1, $2, NOW())';
  db.none(sql, data);
}

/*TODO DB changed by putting photos in photo table */
exports.createPostWithPhoto = async data => {
  sql = 'INSERT INTO posts(account_id, text, photo)\
    VALUES($1, $2, $3)';
  db.none(sql, data);
}

/* get time difference */
exports.timeDifference = async postId => {
  let getPostCreatedAt = 'SELECT created_at FROM posts\
    WHERE id = $1';

  let { created_at: timestampPost } = await db.one(getPostCreatedAt, postId);

  let sql = 'SELECT EXTRACT(epoch FROM now() - $1)';
  let timeDifference = await db.one(sql, timestampPost);
  console.log(timeDifference);
}
