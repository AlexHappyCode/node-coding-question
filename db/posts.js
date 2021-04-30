/* File: db/posts.js */

db = require('../config/pg-promise');

/* creates a post */
exports.createPost = async data => {
  sql = 'INSERT INTO posts(account_id, text)\
    VALUES($1, $2)';
  db.none(sql, data);
}

exports.createPostWithPhoto = async data => {
  sql = 'INSERT INTO posts(account_id, text, photo)\
    VALUES($1, $2, $3)';
  db.none(sql, data);
}
