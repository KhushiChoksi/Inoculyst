const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'inoculyst_user',
  password: 'inoculyst',
  database: 'INOCULYST'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to DB');
});

module.exports = connection;