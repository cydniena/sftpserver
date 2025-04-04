// const Client = require('ssh2-sftp-client');
// const fs = require('fs');
// const path = require('path');
// const sftpConfig = require('../config/sftpConfig');
// const { insertTransaction } = require('./dbService');

// async function fetchTransactionsFromSFTP() {
//   const sftp = new Client();
//   try {
//     await sftp.connect(sftpConfig);

//     const filePath = path.join(__dirname, '../data/transactions.json');
//     await sftp.fastGet(sftpConfig.remotePath + 'transactions.json', filePath);

//     console.log('Reading and parsing transactions file...');
//     const transactions = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

//     console.log('Inserting transactions into the database...');
//     for (const transaction of transactions) {
//       await insertTransaction(transaction);
//     }

//     console.log('Transactions successfully inserted into the database.');
//     return { success: true, message: 'Transactions successfully inserted into the database.' };
//   } catch (error) {
//     console.error('SFTP Error:', error);
//     return { success: false, message: 'Failed to fetch transactions.' };
//   } finally {
//     sftp.end();
//   }  
// }

// module.exports = { fetchTransactionsFromSFTP };
// const Client = require('ssh2-sftp-client');
// const fs = require('fs');
// const path = require('path');
// const sftpConfig = require('../config/sftpConfig');
// const pool = require('../config/dbConfig'); // Use the pool instead of dbService

// async function fetchTransactionsFromSFTP() {
//   const sftp = new Client();
//   let mysqlConn;

//   try {
//     console.log('Connecting to SFTP...');
//     await sftp.connect(sftpConfig);
//     console.log('SFTP connected');

//     console.log('Connecting to MySQL...');
//     mysqlConn = await pool.getConnection();
//     await mysqlConn.ping();
//     console.log('MySQL connected');

//     console.log('Downloading file...');
//     const remotePath = `${sftpConfig.remotePath}transactions.json`;
//     const dataBuffer = await sftp.get(remotePath);
//     const data = dataBuffer.toString('utf8');
//     const transactions = JSON.parse(data);
//     console.log(`Found ${transactions.length} transactions`);

//     // Process transactions
//     await mysqlConn.query('START TRANSACTION');

//     const insertQuery = `
//       INSERT INTO transactions (
//         transaction_id, client_id, amount, transaction_date, transaction_type, transaction_status
//       ) VALUES (?, ?, ?, ?, ?, ?)
//     `;

//     for (const txn of transactions) {
//       const values = [
//         txn.transaction_id,
//         txn.client_id,
//         txn.amount,
//         txn.transaction_date,
//         txn.transaction_type,
//         txn.transaction_status
//       ];
//       await mysqlConn.query(insertQuery, values);
//     }

//     await mysqlConn.query('COMMIT');

//     return { success: true, message: 'Data processed' };

//   } catch (err) {
//     console.error('Error at step:', err.step || 'unknown', err.message);
//     if (mysqlConn) await mysqlConn.query('ROLLBACK');
//     return { 
//       success: false, 
//       step: err.step || 'unknown',
//       error: err.message 
//     };
//   } finally {
//     if (sftp) await sftp.end();
//     if (mysqlConn) mysqlConn.release();
//   }
// }

// module.exports = { fetchTransactionsFromSFTP };

const { Client } = require('ssh2');
const fs = require('fs');
const mysql = require('mysql2');

const sftpClient = new Client();

// MySQL connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'YourNewSecureP@ssw0rd!',
  database: 'transactions_db',
};

// Set up the MySQL connection pool
const pool = mysql.createPool(dbConfig).promise();

// SFTP server configuration
const sftpConfig = {
  host: '18.140.63.244',
  port: 22,
  username: 'cydnie', 
  password: 'sftpacc1',  
};

// Function to fetch the transactions file from the SFTP server
const fetchFileFromSftp = async () => {
  return new Promise((resolve, reject) => {
    sftpClient.on('ready', () => {
      console.log('SFTP connection established.');

      // Fetch the file from the SFTP server
      sftpClient.get('/uploads/transactions.json', (err, stream) => {
        if (err) {
          reject('Error fetching file from SFTP');
        }

        const filePath = './transactions.json';
        const writeStream = fs.createWriteStream(filePath);

        stream.pipe(writeStream);

        writeStream.on('close', () => {
          console.log('File fetched successfully.');
          sftpClient.end();
          resolve(filePath);  // Return the file path for further processing
        });

        stream.on('error', (error) => {
          reject(error);
        });
      });
    }).connect(sftpConfig);
  });
};

// Function to process the transactions and insert them into MySQL
const processAndInsertTransactions = async (filePath) => {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  // Insert each transaction into the MySQL table
  for (const txn of data) {
    try {
      await pool.execute(
        'INSERT INTO transactions (transaction_id, client_id, amount, transaction_date, transaction_type, transaction_status) VALUES (?, ?, ?, ?, ?, ?)',
        [txn.transaction_id, txn.client_id, txn.amount, txn.transaction_date, txn.transaction_type, txn.transaction_status]
      );
      console.log(`Transaction ${txn.transaction_id} inserted successfully.`);
    } catch (err) {
      console.error(`Error inserting transaction ${txn.transaction_id}:`, err);
    }
  }
};

// Combine everything into a single function to fetch and insert transactions
const fetchAndInsertTransactions = async () => {
  try {
    const filePath = await fetchFileFromSftp();
    await processAndInsertTransactions(filePath);
    console.log('All transactions uploaded to the database successfully!');
  } catch (err) {
    console.error('Error fetching and inserting transactions:', err);
  }
};

// Trigger the process when the backend endpoint is hit
fetchAndInsertTransactions();
