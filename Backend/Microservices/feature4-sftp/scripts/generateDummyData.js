const fs = require('fs');
const path = require('path');
const moment = require('moment'); 

const transactions = [];
for (let i = 1; i <= 10; i++) {
  transactions.push({
    transaction_id: `TXN${1000 + i}`,
    client_id: `C00${i}`,
    amount: (Math.random() * 1000).toFixed(2),
    transaction_date: moment().format('YYYY-MM-DD HH:mm:ss'),
    transaction_type: i % 2 === 0 ? 'withdrawal' : 'deposit',
    transaction_status: 'completed'
  });
}
fs.writeFileSync(path.join(__dirname, '../data/transactions.json'), JSON.stringify(transactions, null, 2));
console.log('Dummy transaction data generated.');