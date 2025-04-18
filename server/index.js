const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors())

const db = require('./db.js');

app.get('/', (req, res) => {
    res.send('Hello from the server!');
});  

app.get('/test-db', (req, res) => {
  db.query('SELECT * FROM ACCOUNT', (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).send('Something broke querying the DB');
    }
    res.json(results);
  });
});


app.listen(8080, () => {
    console.log('server listening on port 8080')
})