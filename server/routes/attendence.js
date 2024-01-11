const express = require('express')
const router = express.Router()
const attendence = require('../controllers/attendence')

router.post('/attendence/:date',attendence.addAttendence)
router.get('/attendence',attendence.getAttendenceList)
router.get('/attendence/:date',attendence.getAttendenceListByDate)

module.exports = router