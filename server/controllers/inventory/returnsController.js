const db = require('../../db');

// retrieve all returned batches
exports.getAllReturnedBatches = (req, res) => {
    db.query('SELECT * FROM RETURNED_BATCHES', (err, results) => {
        if (err) return res.status(500).send('Error getting all returned batches');
        res.json(results);
    });
};

// insert a returned batch and delete it from batch table
exports.addReturnedBatch = (req, res) => {
  const { 
      admin_id, 
      distributor_name, 
      batch_number 
  } = req.body;

  const return_id = admin_id + batch_number;
  
  // query to insert into RETURNED_BATCHES table
  const insertQuery = `
    INSERT INTO RETURNED_BATCHES (Return_ID, Admin_ID, Distributor_Name, Batch_Number)
    VALUES (?, ?, ?, ?)
  `;
    
  db.query(insertQuery, [return_id, admin_id, distributor_name, batch_number], (err, insertResult) => {
    if (err) {
      console.error('Error inserting returned batch:', err);
      return res.status(500).send('Error inserting returned batch');
    }
    
    // query to delete returned batch from BATCH (which will cascade to other tables)
    const deleteQuery = `
      DELETE FROM BATCH
      WHERE Batch_Number IN (
        SELECT Batch_Number
        FROM RETURNED_BATCHES
        WHERE Return_ID = ?
      )
    `;
      
    db.query(deleteQuery, [return_id], (err, deleteResult) => {
      if (err) {
        console.error('Error deleting batch:', err);
        return res.status(500).send('Error deleting batch');
      }
      
      res.status(200).json({
        message: 'Batch successfully returned and removed from inventory',
        insertedId: insertResult.insertId,
        deletedRows: deleteResult.affectedRows
      });
    });
  });
};