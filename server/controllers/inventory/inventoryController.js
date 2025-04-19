const db = require('../../db');

exports.getInventory = (req, res) => {
  db.query('SELECT * FROM INVENTORY', (err, results) => {
    if (err) return res.status(500).send('Error getting inventory');
    res.json(results);
  });
};