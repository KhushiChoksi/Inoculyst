const db = require('../../db');

exports.getAllOwners = (req, res) => {
  db.query('SELECT * FROM OWNER', (err, results) => {
    if (err) return res.status(500).send('Error getting owners');
    res.json(results);
  });
};