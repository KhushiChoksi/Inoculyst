const db = require('../../db');

// retrieve all batches
exports.getAllBatchesInfo = (req, res) => {
  db.query('SELECT * FROM BATCH', (err, results) => {
    if (err) return res.status(500).send('Error getting all batches');
    res.json(results);
  });
};

// update batch quantity
exports.updateBatchQuantity = (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const query = 'UPDATE BATCH SET Batch_Quantity = ? WHERE Batch_Number = ?';
  db.query(query, [quantity, id], (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).send('Error updating batch quantity');
    }
    res.json({ message: 'Batch quantity updated' });
  });
};

// update batch expiry
exports.updateBatchExpiry = (req, res) => {
  const { id } = req.params;
  const { expiry } = req.body;

  const query = 'UPDATE BATCH SET Expiry_Date = ? WHERE Batch_Number = ?';
  db.query(query, [expiry, id], (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).send('Error updating batch expiry date');
    }
    res.json({ message: 'Batch expiry date updated' });
  });
};

// update batch vaccine type
exports.updateBatchVaccineType = (req, res) => {
  const { id } = req.params;
  const { vaccine } = req.body;

  const query = 'UPDATE BATCH SET Vaccine_Name = ? WHERE Batch_Number = ?';
  db.query(query, [vaccine, id], (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).send('Error updating batch vaccine name');
    }
    res.json({ message: 'Batch vaccine name updated' });
  });
};


/* 
SAMPLE CURL insert
curl -X POST http://localhost:8080/batches/add-batch \
  -H "Content-Type: application/json" \
  -d '{
    "order_status": "Arrived",
    "date_added": "2025-04-19",
    "batch_quantity": 5,
    "expiry_date": "2029-08-23",
    "vaccine_name": "[Inf] Vaxigrip",
    "pharmacy_name": "PharmaPlus"
}'

- https://www.geeksforgeeks.org/how-to-add-unique-id-to-each-record-in-your-local-custom-database-in-node-js
- https://stackoverflow.com/questions/73795994/how-to-create-a-custom-id-using-auto-increment-at-the-time-of-table-creation-in 
*/
exports.addNewBatch = (req, res) => {
  const {
    order_status,
    date_added,
    batch_quantity,
    expiry_date,
    vaccine_name,
    pharmacy_name
  } = req.body;

  // select the highest current batch number
  const getMaxBatchNumberQuery = `SELECT Batch_Number FROM BATCH ORDER BY Batch_Number DESC LIMIT 1`;

  db.query(getMaxBatchNumberQuery, (err, results) => {
    if (err) {
      console.error('Error getting max batch number:', err);
      return res.status(500).send('Error retrieving batch number');
    }

    let newBatchNumber = 'BA001';       // default if batch table is empty

    if (results.length > 0) {
      const lastBatch = results[0].Batch_Number;                
      const numPart = parseInt(lastBatch.slice(2)) + 1;         // increment batch number
      newBatchNumber = 'BA' + String(numPart).padStart(3, '0'); // create new batch number with incremented number
    }

    // query to insert into BATCH
    const insertBatchQuery = `
      INSERT INTO BATCH (Batch_Number, Order_status, Date_Added, Batch_Quantity, Expiry_Date, Vaccine_Name)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    // insert into BATCH
    db.query(insertBatchQuery, [newBatchNumber, order_status, date_added, batch_quantity, expiry_date, vaccine_name], (err, batchResult) => {
      if (err) {
        console.error('Error inserting batch:', err);
        return res.status(500).send('Error inserting batch');
      }

      // query to insert into INVENTORY
      const insertInventoryQuery = `
        INSERT INTO INVENTORY (Pharmacy_Name, Batch_Number)
        VALUES (?, ?)
      `;

      // insert into INVENTORY
      db.query(insertInventoryQuery, [pharmacy_name, newBatchNumber], (err, inventoryResult) => {
        if (err) {
          console.error('Error inserting inventory:', err);
          return res.status(500).send('Error inserting inventory');
        }

        res.status(201).json({
          message: 'Batch and inventory added successfully',
          batch_number: newBatchNumber
        });
      });
    });
  });
};


// delete a batch
exports.deleteBatch = (req, res) => {
  const { id } = req.params;

  // transaction, so if one query fails, the whole query fails
  db.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err);
      return res.status(500).send('Error starting transaction');
    }

    // delete from INVENTORY
    db.query('DELETE FROM INVENTORY WHERE Batch_Number = ?', [id], (err, results) => {
      if (err) {
        return db.rollback(() => {
          console.error('Error deleting from INVENTORY:', err);
          return res.status(500).send('Error deleting from INVENTORY');
        });
      }

      // delete from BATCH
      db.query('DELETE FROM BATCH WHERE Batch_Number = ?', [id], (err, results) => {
        if (err) {
          return db.rollback(() => {
            console.error('Error deleting from BATCH:', err);
            return res.status(500).send('Error deleting from BATCH');
          });
        }

        // commit the full deletion if both deletions are successful
        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              console.error('Error committing transaction:', err);
              return res.status(500).send('Error committing transaction');
            });
          }

          res.json({ message: 'Batch deleted successfully' });
        });
      });
    });
  });
};

