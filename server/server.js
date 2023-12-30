const mysql = require('mysql');
const express = require('express');
// const connection = require('./conn')

const app = express();
const port = 8000;

require('./config/conn')
const executeQuery = require('./config/query')

app.get('/', async (req, res) => {
  const query = `SELECT * FROM employee`;

  try {
    const results = await executeQuery(query);
    console.log(results);
    res.send(results);
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`App is running on ${port}...`);
});

