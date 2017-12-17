const mysql = require('mysql');
const config = require('./config.json');

const pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.pass,
  database: config.database
});

const db = (() => {
  _query = (query, params, callback) => {
    pool.getConnection((err, connection) => {
      if (err) {
        callback(null, err);
      } else {
        connection.query(query, params, (err, rows) => {
          connection.release();
          if (!err) {
            callback(rows);
          } else {
            callback(null, err);
          }
        });
      }
    });
  };

  return {
    query: _query
  };
})();

module.exports = db;
