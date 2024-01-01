const mysql = require('mysql');
const express = require('express');
const cors = require('cors')
const app = express();
const port = 4000;
require('./config/conn')

app.use(cors());
const adminRouter = require('./routes/admin')
app.use(adminRouter)

app.listen(port, () => {
  console.log(`App is running on ${port}...`);
});

