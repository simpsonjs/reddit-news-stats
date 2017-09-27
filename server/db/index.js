const mysql = require('mysql');
const config = require('./config.json');

const connection = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.pass,
  database : config.database
});

connection.connect();

module.exports = connection;
