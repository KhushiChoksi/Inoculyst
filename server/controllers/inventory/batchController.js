const db = require('../../db');

exports.getAllBatchesInfo = (req, res) => {
  db.query('SELECT * FROM BATCH', (err, results) => {
    if (err) return res.status(500).send('Error getting all batches');
    res.json(results);
  });
};