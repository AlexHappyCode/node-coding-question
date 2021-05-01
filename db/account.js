/* File: db/account.js */

db = require('../config/pg-promise');

/* [name, email, password] -> null */
exports.insertAccount = async data => {
  let error = null;

  sql = 'INSERT INTO accounts(name, email, password)\
  VALUES($1, $2, $3)';

  await db.none(sql, data).catch(e => {
    console.log(e);
    error = e;
  });
  return error;
}

/* password -> String */
exports.getHashedPassword = async email => {
  sql = 'SELECT password FROM accounts\
  WHERE email = $1';
  let  result  = await db.one(sql, email)
    .catch(e => {
      console.log('error', e);
    });
  return result;
}

/* email -> accountId */
exports.getAccountId = async email => {
  sql = 'SELECT id FROM accounts\
    WHERE email = $1';

  let result = await db.one(sql, email)
    .catch(e => {
      console.log('error', e);
    });
  return result;
}

exports.setUsername = async data => {
  sql = 'UPDATE accounts\
    SET username = $1\
    WHERE id = $2';

  db.none(sql, data);
}
