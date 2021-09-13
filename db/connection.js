const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Quinn12778!!',
  database: 'company_db'
});

module.exports = db;
