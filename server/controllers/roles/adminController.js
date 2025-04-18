const db = require('../../db');

exports.getAllAdmins = (req, res) => {
  db.query('SELECT * FROM ADMIN', (err, results) => {
    if (err) return res.status(500).send('Error getting admins');
    res.json(results);
  });
};