// const Client = require('ssh2');
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

const Client = require('ssh2');
const fs = require('fs');
const path = require('path');
const sftpConfig = require('../config/sftpConfig');
const pool = require('../config/dbConfig'); // Use the pool instead of dbService

async function fetchTransactionsFromSFTP() {
  const sftp = new Client();
  let mysqlConn;

  try {
    console.log('Connecting to SFTP...');
    await sftp.connect(sftpConfig);
    console.log('SFTP connected');

    console.log('Connecting to MySQL...');
    mysqlConn = await pool.getConnection();
    await mysqlConn.ping();
    console.log('MySQL connected');

    console.log('Downloading file...');
    const remotePath = `${sftpConfig.remotePath}transactions.json`;
    const dataBuffer = await sftp.get(remotePath);
    const data = dataBuffer.toString('utf8');
    const transactions = JSON.parse(data);
    console.log(`Found ${transactions.length} transactions`);

    // Process transactions
    await mysqlConn.query('START TRANSACTION');

    const insertQuery = `
      INSERT INTO transactions (
        transaction_id, client_id, amount, transaction_date, transaction_type, transaction_status
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;

    for (const txn of transactions) {
      const values = [
        txn.transaction_id,
        txn.client_id,
        txn.amount,
        txn.transaction_date,
        txn.transaction_type,
        txn.transaction_status
      ];
      await mysqlConn.query(insertQuery, values);
    }

    await mysqlConn.query('COMMIT');

    return { success: true, message: 'Data processed' };

  } catch (err) {
    console.error('Error at step:', err.step || 'unknown', err.message);
    if (mysqlConn) await mysqlConn.query('ROLLBACK');
    return { 
      success: false, 
      step: err.step || 'unknown',
      error: err.message 
    };
  } finally {
    if (sftp) await sftp.end();
    if (mysqlConn) mysqlConn.release();
  }
}

module.exports = { fetchTransactionsFromSFTP };
