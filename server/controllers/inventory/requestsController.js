const db = require('../../db');

// get all requests regardless of status
exports.getAllRequests = (req, res) => {
    db.query('SELECT * FROM REQUEST', (err, results) => {
        if (err) return res.status(500).send('Error getting all requests');
        res.json(results);
    });
};

// get all pending requests information
exports.getAllPendingRequests = (req, res) => {
    db.query(`
        SELECT r.*, bpr.Batch_Number 
        FROM BATCH_PENDING_REQUESTS bpr
        LEFT JOIN REQUEST r ON bpr.Batch_Number = r.Batch_Number
        WHERE bpr.Batch_Number IS NOT NULL AND r.Status = 'Pending'`, 
        (err, results) => {
            if (err) return res.status(500).send('Error getting all pending requests');
            res.json(results);
        });
};

// refresh pending requests table
exports.updatePendingRequestsTable = (req, res) => {
    const clearSql = `DELETE FROM BATCH_PENDING_REQUESTS`;
    const insertSql = `
        INSERT INTO BATCH_PENDING_REQUESTS (Batch_Number, Request_ID, Technician_ID)
        SELECT r.Batch_Number, r.Request_ID, r.Technician_ID
        FROM REQUEST r
        WHERE r.Status = 'Pending';
    `;

    db.query(clearSql, (err) => {
        if (err) return res.status(500).send('Error clearing pending requests');
        db.query(insertSql, (err, results) => {
            if (err) return res.status(500).send('Error inserting pending requests');
            res.json({ message: 'Pending requests refreshed', inserted: results.affectedRows });
        });
    });
};

// insert a request
exports.addNewRequest = (req, res) => {
    const {
        technician_id,
        batch_number,
        status = 'Pending', 
        order_status,
        date_added,
        batch_quantity,
        expiry_date,
        vaccine_name,
        pharmacy_name
    } = req.body;

    const request_id = technician_id + batch_number;

    // query to check if this request already exists
    const checkExistingQuery = `SELECT * FROM REQUEST WHERE Request_ID = ?`;

    db.query(checkExistingQuery, [request_id], (err, existingResults) => {
        if (err) {
            console.error('Error checking for existing request:', err);
            return res.status(500).send('Error checking for existing request');
        }

        if (existingResults.length > 0) {
            return res.status(400).json({ message: 'This request already exists' });
        }

        // insert if request does not already exist
        const insertRequestQuery = `
            INSERT INTO REQUEST (Request_ID, Technician_ID, Batch_Number, Status, Order_status, Date_Added, Batch_Quantity, Expiry_Date, Vaccine_Name, Pharmacy_Name)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(insertRequestQuery, [request_id, technician_id, batch_number, status, order_status, date_added, batch_quantity, expiry_date, vaccine_name, pharmacy_name], (err, result) => {
            if (err) {
                console.error('Error inserting request:', err);
                return res.status(500).send('Error inserting request');
            }

            res.json({
                message: 'Request added successfully',
                request_id: request_id
            });
        });
    });
};

// update request status
exports.updateRequestStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const statusQuery = 'SELECT Status FROM REQUEST WHERE Request_ID = ?';
    const query = 'UPDATE REQUEST SET Status = ? WHERE Request_ID = ? AND Status = "Pending"';
    db.query(query, [status, id], (err, results) => {
        if (err) {
            console.error('DB error:', err);
            return res.status(500).send('Error updating request status');
        }
        if (statusQuery != 'Pending') {
            return res.status(500).send('Cannot update a non-pending request');
        }
        res.json({ message: 'Request status updated' });
    });
};

// update accepted requests
exports.updateBatchFromAcceptedRequests = (req, res) => {
    const updateBatchQuery = `
        UPDATE BATCH b
        JOIN REQUEST r ON b.Batch_Number = r.Batch_Number
        SET 
            b.Order_status = r.Order_status,
            b.Batch_Quantity = r.Batch_Quantity
        WHERE r.Status = "Accepted";
    `;

    db.query(updateBatchQuery, (err, results) => {
        if (err) {
            console.error('Error updating batch table:', err);
            return res.status(500).send('Error updating batch table');
        }

        res.json({
            message: 'Batch table updated successfully from accepted requests',
            updatedRows: results.affectedRows
        });
    });
};

// delete a request
exports.deleteRequest = (req, res) => {
    const { id } = req.params;
  
    deleteQuery = 'DELETE FROM REQUEST WHERE Request_ID = ?';

    // delete from REQUEST table
    db.query(deleteQuery, [id], (err, results) => {
        if (err) {
            return db.rollback(() => {
                console.error('Error deleting from REQUEST:', err);
                return res.status(500).send('Error deleting from REQUEST');
            });
        }
        res.json({ message: 'Request deleted' });        
    });
};
