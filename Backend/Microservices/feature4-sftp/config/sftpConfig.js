// const fs = require('fs'); 
// require('dotenv').config();

// module.exports = {
//   host: process.env.SFTP_HOST || '18.139.114.210',
//   port: process.env.SFTP_PORT,
//   username: process.env.SFTP_USER  || 'cydnie',
//   password: 'sftpacc1',
//   privateKey: fs.readFileSync(process.env.SSH_PRIVATE_KEY_PATH),
//   remotePath: '/Users/cydniena/Documents/transactions/' || '/var/sftp/cydnie/uploads/'
// };

const fs = require('fs'); 
// require('dotenv').config();

module.exports = {
  host: '18.140.63.244', // EC2 public IP
  port: 22,
  username: 'cydnie',
  password: 'sftpacc1',
  readyTimeout: 30000, // 30 seconds
  retries: 2, // Add retry attempts
  retry_minTimeout: 2000, 
  remotePath: '/uploads/',
  debug: console.log // Enable debugging
};