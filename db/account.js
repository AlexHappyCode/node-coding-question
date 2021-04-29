db = require('../config/pg-promise');

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
