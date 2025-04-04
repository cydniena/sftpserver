const pool = require('../config/dbConfig');

async function insertTransaction(transaction) {
  const sql = `INSERT INTO transactions (transaction_id, client_id, amount, transaction_date, transaction_type, transaction_status) VALUES (?, ?, ?, ?, ?, ?)`;
  await pool.execute(sql, [
    transaction.transaction_id,
    transaction.client_id,
    transaction.amount,
    transaction.transaction_date,
    transaction.transaction_type,
    transaction.transaction_status
  ]);
}

module.exports = { insertTransaction };