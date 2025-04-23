const db = require('../../db');

// retrieve all distributors
exports.getAllDistributors = (req, res) => {
  db.query('SELECT * FROM DISTRIBUTOR', (err, results) => {
    if (err) return res.status(500).send('Error getting distributors');
    res.json(results);
  });
};