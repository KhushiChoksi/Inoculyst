const db = require('../../db');

// retrive from database
exports.getUpdateDate = (req, res) => {
  db.query('SELECT Update_Date FROM ANALYTICS', (err, results) => {
    if (err) return res.status(500).send('Error getting all batches');
    res.json(results);
  });
};

// retrieve expired batches
exports.getExpiredBatches = (req, res) => {
    db.query('SELECT aeb.A_Expired_Batches, b.Order_status, b.Date_Added, b.Batch_Quantity, b.Expiry_Date, b.Vaccine_Name, b.Pharmacy_Name FROM ANALYTICS_EXPIRED_BATCHES aeb JOIN BATCH b ON aeb.A_Expired_Batches = b.Batch_Number ', (err, results) => {
      if (err) return res.status(500).send('Error getting expired batches');
      res.json(results);
    });
};

// retrieve expiring batches
exports.getExpiringBatches = (req, res) => {
    db.query('SELECT aueb.A_Upcoming_expiring_Batches, b.Order_status, b.Date_Added, b.Batch_Quantity, b.Expiry_Date, b.Vaccine_Name, b.Pharmacy_Name FROM ANALYTICS_UPCOMING_EXPIRING_BATCHES aueb JOIN BATCH b ON aueb.A_Upcoming_expiring_Batches = b.Batch_Number', (err, results) => {
      if (err) return res.status(500).send('Error getting upcoming expiring batches');
      res.json(results);
    });
};

// retrieve newly added batches
exports.getNewlyAddedBatches = (req, res) => {
    db.query('SELECT anab.A_Newly_Added_Batches, b.Order_status, b.Date_Added, b.Batch_Quantity, b.Expiry_Date, b.Vaccine_Name, b.Pharmacy_Name FROM ANALYTICS_NEWLY_ADDED_BATCHES anab JOIN BATCH b ON anab.A_Newly_Added_Batches = b.Batch_Number', (err, results) => {
      if (err) return res.status(500).send('Error getting newly added batches');
      res.json(results);
    });
};

// get analytics counts
exports.getAnalyticsCounts = (req, res) => {

    // queries to retrieve indiviudal batch and analytic counts
    const queries = {
      expired: 'SELECT COUNT(*) AS count FROM ANALYTICS_EXPIRED_BATCHES',
      expiring: 'SELECT COUNT(*) AS count FROM ANALYTICS_UPCOMING_EXPIRING_BATCHES',
      newlyAdded: 'SELECT COUNT(*) AS count FROM ANALYTICS_NEWLY_ADDED_BATCHES',
      totalBatches: 'SELECT COUNT(*) AS count FROM BATCH'
    };
  
    const results = {};
  
        db.query(queries.expired, (err, expiredResult) => {
            if (err) return res.status(500).send('Error getting expired batch count');
            results.expired_batches = expiredResult[0].count;
        
            db.query(queries.expiring, (err, expiringResult) => {
                if (err) return res.status(500).send('Error getting expiring batch count');
                results.expiring_batches = expiringResult[0].count;
        
                db.query(queries.newlyAdded, (err, newlyResult) => {
                    if (err) return res.status(500).send('Error getting newly added batch count');
                    results.newly_added_batches = newlyResult[0].count;

                    db.query(queries.totalBatches, (err, totalResult) => {
                        if (err) return res.status(500).send('Error getting total batch count');
                        results.total_batches = totalResult[0].count;

                        res.json(results);
                    });
                });
        });
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
