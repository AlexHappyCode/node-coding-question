db = require('../config/pg-promise');

exports.insertAccount = (data) => {
  sql = `INSERT INTO accounts(name, email, password)
    VALUES('${data.name}', '${data.email}', '${data.password}')`;
  db.none(sql);
}
