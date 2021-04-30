/* File: db/posts.js */

db = require('../config/pg-promise');

//TODO add columns with content of posts
exports.createPost = async data => {
  sql = 'INSERT INTO posts(accountId, text)\
    VALUES($1, $2)';
  console.log(sql, data);
  db.none(sql, data);
}
