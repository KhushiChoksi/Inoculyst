const mysql = require('mysql2');

// custom user credentials
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'inoculyst_user',
  password: 'inoculyst',
  database: 'INOCULYST'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to DB');     // successful message upon connection
});

module.exports = connection;