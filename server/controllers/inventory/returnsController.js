const db = require('../../db');

exports.getAllReturnsToBatches = (req, res) => {
    db.query('SELECT * FROM RETURNS_TO', (err, results) => {
        if (err) return res.status(500).send('Error getting all returns to batches');
        res.json(results);
    });
};

exports.getAllReturnedBatches = (req, res) => {
    db.query('SELECT * FROM RETURNS_TO_RETURNED_BATCHES', (err, results) => {
        if (err) return res.status(500).send('Error getting all returned batches');
        res.json(results);
    });
};