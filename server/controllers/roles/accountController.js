const db = require('../../db');

exports.getAllAccounts = (req, res) => {
  db.query('SELECT * FROM ACCOUNT', (err, results) => {
    if (err) return res.status(500).send('Error getting accounts');
    res.json(results);
  });
};