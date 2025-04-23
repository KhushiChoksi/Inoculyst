const db = require('../../db');

// retrieve all assistants
exports.getAllAssistants = (req, res) => {
  db.query('SELECT * FROM ASSISTANT', (err, results) => {
    if (err) return res.status(500).send('Error getting assistants');
    res.json(results);
  });
};