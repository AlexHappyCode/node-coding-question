/* File: db/posts.js */

db = require('../config/pg-promise');

//TODO add columns with content of posts
exports.createPost = async data => {
  sql = 'INSERT INTO posts(account_id, text)\
    VALUES($1, $2)';
  db.none(sql, data);
}
