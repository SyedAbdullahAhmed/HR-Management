const mysql = require('mysql');
const express = require('express');
const cors = require('cors')
const app = express();
const port = 8000;
require('./config/conn')
app.use(cors())

const admingRouter = require('./routes/admin')
app.use(admingRouter)

app.listen(port, () => {
  console.log(`App is running on ${port}...`);
});

