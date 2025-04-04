const mysql = require('mysql2');
require('dotenv').config();

console.log('password', process.env.DB_PASSWORD);  
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'YourNewSecureP@ssw0rd!',
  database: 'transactions_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();

// const mysql = require('mysql2/promise');

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'cydnie',
//   password: 'sftpacc1',
//   database: 'sftp_transactions_db',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// module.exports = pool;