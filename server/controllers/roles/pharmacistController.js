const db = require('../../db');

// retrieve all pharmacists
exports.getAllPharmacists = (req, res) => {
  db.query('SELECT * FROM PHARMACIST', (err, results) => {
    if (err) return res.status(500).send('Error getting pharmacists');
    res.json(results);
  });
};