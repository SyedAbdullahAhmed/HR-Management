const express = require('express')
const router = express.Router()
const attendence = require('../controllers/attendence')

router.post('/attendence/:date',attendence.addAttendence)
router.get('/attendence',attendence.getAttendenceList)
router.get('/attendence/:date',attendence.getAttendenceListByDate)
router.put('/attendence',attendence.updateAttendenceList) 
router.get('/salary',attendence.getSalaryStatus) 
router.delete('/attendence',attendence.deleteAllAttendence) 

module.exports = router