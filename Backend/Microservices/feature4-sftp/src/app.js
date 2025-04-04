require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const { fetchTransactionsFromSFTP } = require('./sftpService');

const app = express();
const port = 5002;

app.use(express.json());
app.use(cors()); 
console.log(process.env.DB_HOST);

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "sftp_transactions_db",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL Connection Failed:", err);
  } else {
    console.log("Connected to MySQL Database");
  }
});

app.get('/api/transactions', (req, res) => {
  const query = "SELECT * FROM transactions";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database Query Failed:", err);
      return res.status(500).json({ error: "Failed to fetch transactions" });
    }
    res.json(results);
  });
});

app.post('/fetch-transactions', async (req, res) => {
  try {
    const result = await fetchTransactionsFromSFTP();
    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(500).json({ message: result.message });
    }
  } catch (error) {
    console.error('Error during fetch-transactions:', error);
    return res.status(500).json({ message: 'Error fetching transactions from SFTP.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
