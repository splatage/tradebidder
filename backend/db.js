const mariadb = require('mariadb'); 

const pool = mariadb.createPool({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

module.exports = pool;
