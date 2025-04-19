const db = require('../../db');

exports.getAllBatchesInfo = (req, res) => {
  db.query('SELECT * FROM BATCH', (err, results) => {
    if (err) return res.status(500).send('Error getting all batches');
    res.json(results);
  });
};

exports.updateBatchQuantity = (req, res) => {
  const { id } = req.params;
  const { number } = req.body;

  const query = 'UPDATE BATCH SET Quantity = ? WHERE Batch_Number = ?';
  db.query(query, [number, id], (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).send('Error updating batch quantity');
    }
    res.json({ message: 'Batch quantity updated' });
  });
};