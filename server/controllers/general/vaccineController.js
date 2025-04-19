const db = require('../../db');

// this only gets the vaccines
exports.getVaccines = (req, res) => {
  db.query('SELECT * FROM VACCINE', (err, results) => {
    if (err) return res.status(500).send('Error getting all vaccines');
    res.json(results);
  });
};

// this gets vaccine ingredients too
exports.getIngredients = (req, res) => {
    const sql = `
      SELECT VACCINE.*, VACCINE_ACTIVE_INGREDIENTS.*
      FROM VACCINE
      JOIN VACCINE_ACTIVE_INGREDIENTS ON VACCINE.Vaccine_Name = VACCINE_ACTIVE_INGREDIENTS.Vaccine_Name
    `;
  
    db.query(sql, (err, results) => {
      if (err) return res.status(500).send('Error getting ingredients');
      res.json(results);
    });
};