const db = require('../../db');

exports.getAllAccounts = (req, res) => {
  db.query('SELECT * FROM ACCOUNT', (err, results) => {
    if (err) return res.status(500).send('Error getting accounts');
    res.json(results);
  });
};

// update account type
exports.updateAccountType = (req, res) => {
  const { id } = req.params;
  const { accountType } = req.body;

  const query = 'UPDATE ACCOUNT SET Account_type = ? WHERE ID = ?';
  db.query(query, [accountType, id], (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).send('Error updating account type');
    }
    res.json({ message: 'Account type updated' });
  });
};