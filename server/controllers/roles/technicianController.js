const db = require('../../db');

exports.getAllTechnicians = (req, res) => {
  db.query('SELECT * FROM TECHNICIAN', (err, results) => {
    if (err) return res.status(500).send('Error getting technicians');
    res.json(results);
  });
};