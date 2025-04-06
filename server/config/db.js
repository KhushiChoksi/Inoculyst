const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Inoculyst'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to DB');
});

module.exports = connection;