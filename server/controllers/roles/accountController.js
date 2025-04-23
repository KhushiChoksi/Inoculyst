const db = require('../../db');

// retrieve all accounts
exports.getAllAccounts = (req, res) => {
  db.query('SELECT * FROM ACCOUNT', (err, results) => {
    if (err) return res.status(500).send('Error getting accounts');
    res.json(results);
  });
};

// update account type (assistant to technician only)
exports.updateAccountType = (req, res) => {
  const { id } = req.params;
  const { 
    account_type, 
    certification_number
  } = req.body;

  // check that the new account_type is technician
  if (account_type !== 'technician') {
    return res.status(400).send('Only assistant-to-technician updates are allowed.');
  }

  // all the required queries
  const deleteQuery = 'DELETE FROM ASSISTANT WHERE Assistant_ID = ?';
  const insertQuery = 'INSERT INTO TECHNICIAN (Technician_ID, Certification_number) VALUES (?, ?)';
  const updateQuery = 'UPDATE ACCOUNT SET Account_type = ? WHERE ID = ?';

  // rollback in case one query fails
  db.beginTransaction(err => {
    if (err) return res.status(500).send('Failed to start transaction');

    // delete employee from assistant table
    db.query(deleteQuery, [id], (deleteErr) => {
      if (deleteErr) {
        return db.rollback(() => res.status(500).send('Error deleting from assistant table'));
      }

      // insert employee into technician table
      db.query(insertQuery, [id, certification_number], (insertErr) => {
        if (insertErr) {
          return db.rollback(() => res.status(500).send('Error inserting into technician table'));
        }

        // update account type
        db.query(updateQuery, [account_type, id], (updateErr) => {
          if (updateErr) {
            return db.rollback(() => res.status(500).send('Error updating account type'));
          }

          // commit full query
          db.commit(commitErr => {
            if (commitErr) return db.rollback(() => res.status(500).send('Commit failed'));
            res.json({ message: 'Account type updated' });
          });
        });
      });
    });
  });
};

// update password
exports.updateAccountPassword = (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  const query = 'UPDATE ACCOUNT SET Password = ? WHERE ID = ?';
  db.query(query, [password, id], (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).send('Error updating account password');
    }
    res.json({ message: 'Account password updated' });
  });
};

// update username
exports.updateAccountUsername = (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  const query = 'UPDATE ACCOUNT SET Username = ? WHERE ID = ?';
  db.query(query, [username, id], (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).send('Error updating account username');
    }
    res.json({ message: 'Account username updated' });
  });
};