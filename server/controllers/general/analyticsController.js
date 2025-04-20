const db = require('../../db');

// retrive from database
exports.getUpdateDate = (req, res) => {
  db.query('SELECT Update_Date FROM ANALYTICS', (err, results) => {
    if (err) return res.status(500).send('Error getting all batches');
    res.json(results);
  });
};

exports.getExpiredBatches = (req, res) => {
    db.query('SELECT A_Expired_Batches FROM ANALYTICS_EXPIRED_BATCHES', (err, results) => {
      if (err) return res.status(500).send('Error getting expired batches');
      res.json(results);
    });
};

exports.getExpiringBatches = (req, res) => {
    db.query('SELECT A_Upcoming_expiring_Batches FROM ANALYTICS_UPCOMING_EXPIRING_BATCHES', (err, results) => {
      if (err) return res.status(500).send('Error getting upcoming expiring batches');
      res.json(results);
    });
};

exports.getNewlyAddedBatches = (req, res) => {
    db.query('SELECT A_Newly_Added_Batches FROM ANALYTICS_NEWLY_ADDED_BATCHES', (err, results) => {
      if (err) return res.status(500).send('Error getting newly added batches');
      res.json(results);
    });
};


// update expired batches
exports.updateExpiredBatches = (req, res) => {
    const clearSql = `DELETE FROM ANALYTICS_EXPIRED_BATCHES`;
    const insertSql = `
        INSERT INTO ANALYTICS_EXPIRED_BATCHES (Pharmacy_Name, A_Expired_Batches)
        SELECT i.Pharmacy_Name, b.Batch_Number
        FROM BATCH b JOIN INVENTORY i ON b.Pharmacy_Name = i.Pharmacy_Name
        WHERE b.Expiry_Date < CURDATE();
    `;

    db.query(clearSql, (err) => {
        if (err) return res.status(500).send('Error clearing expired batches');
        db.query(insertSql, (err, results) => {
            if (err) return res.status(500).send('Error inserting expired batches');
            res.json({ message: 'Expired batches refreshed', inserted: results.affectedRows });
        });
    });
};

// update upcoming expiring batches
exports.updateExpiringBatches = (req, res) => {
    const clearSql = `DELETE FROM ANALYTICS_UPCOMING_EXPIRING_BATCHES`;
    const insertSql = `
        INSERT INTO ANALYTICS_UPCOMING_EXPIRING_BATCHES (Pharmacy_Name, A_Upcoming_expiring_Batches)
        SELECT i.Pharmacy_Name, b.Batch_Number
        FROM BATCH b JOIN INVENTORY i ON b.Pharmacy_Name = i.Pharmacy_Name
        WHERE b.Expiry_Date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY);
    `;

    db.query(clearSql, (err) => {
        if (err) return res.status(500).send('Error clearing upcoming expiring batches');
        db.query(insertSql, (err, results) => {
            if (err) return res.status(500).send('Error inserting upcoming expiring batches');
            res.json({ message: 'Upcoming expiring batches refreshed', inserted: results.affectedRows });
        });
    });
};

// update newly added batches
exports.updateNewlyAddedBatches = (req, res) => {
    const clearSql = `DELETE FROM ANALYTICS_NEWLY_ADDED_BATCHES`;
    const insertSql = `
        INSERT INTO ANALYTICS_NEWLY_ADDED_BATCHES (Pharmacy_Name, A_Newly_Added_Batches)
        SELECT i.Pharmacy_Name, b.Batch_Number
        FROM BATCH b JOIN INVENTORY i ON b.Pharmacy_Name = i.Pharmacy_Name
        WHERE b.Date_Added BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE();
    `;

    db.query(clearSql, (err) => {
        if (err) return res.status(500).send('Error clearing newly added batches');
        db.query(insertSql, (err, results) => {
            if (err) return res.status(500).send('Error inserting newly added batches');
            res.json({ message: 'Newly added batches refreshed', inserted: results.affectedRows });
        });
    });
};
