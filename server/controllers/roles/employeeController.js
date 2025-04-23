const db = require('../../db');

// retrieve all employees
exports.getAllEmployees = (req, res) => {
  db.query('SELECT * FROM EMPLOYEE', (err, results) => {
    if (err) return res.status(500).send('Error getting employees');
    res.json(results);
  });
};

// update first name
exports.updateFirstName = (req, res) => {
  const { id } = req.params;
  const { firstName } = req.body;

  const query = 'UPDATE EMPLOYEE SET First_name = ? WHERE ID = ?';
  db.query(query, [firstName, id], (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).send('Error updating first name');
    }
    res.json({ message: 'First name updated' });
  });
};

// update last name
exports.updateLastName = (req, res) => {
  const { id } = req.params;
  const { lastName } = req.body;

  const query = 'UPDATE EMPLOYEE SET Last_name = ? WHERE ID = ?';
  db.query(query, [lastName, id], (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).send('Error updating last name');
    }
    res.json({ message: 'Last name updated' });
  });
};

// update email
exports.updateEmail = (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  const query = 'UPDATE EMPLOYEE SET Email = ? WHERE ID = ?';
  db.query(query, [email, id], (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).send('Error updating email');
    }
    res.json({ message: 'Email updated' });
  });
};

// update phone number
exports.updatePhone = (req, res) => {
  const { id } = req.params;
  const { phone } = req.body;

  const query = 'UPDATE EMPLOYEE SET Phone_number = ? WHERE ID = ?';
  db.query(query, [phone, id], (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).send('Error updating phone number');
    }
    res.json({ message: 'Phone number updated' });
  });
};