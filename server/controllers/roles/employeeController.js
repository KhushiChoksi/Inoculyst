const db = require('../../db');

exports.getAllEmployees = (req, res) => {
  db.query('SELECT * FROM EMPLOYEE', (err, results) => {
    if (err) return res.status(500).send('Error getting employees');
    res.json(results);
  });
};