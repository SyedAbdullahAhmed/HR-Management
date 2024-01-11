const mysql = require('mysql');
const express = require('express');
const cors = require('cors')
const app = express();
const port = 8000;
require('./config/conn')

app.use(cors());
app.use(express.json())

const adminRouter = require('./routes/admin')
const employeeRouter = require('./routes/employee')
const projectRouter = require('./routes/project')
const investorRouter = require('./routes/investor')
const attendenceRouter = require('./routes/attendence')
app.use(adminRouter)
app.use(employeeRouter)
app.use(projectRouter)
app.use(investorRouter)
app.use(attendenceRouter)

app.listen(port, () => {
  console.log(`App is running on ${port}...`);
});

