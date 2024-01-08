const express = require('express')
const router = express.Router()
const investorControllers = require('../controllers/investor')

router.get('/investors',investorControllers.getAllInvestors)
router.get('/investorsPro',investorControllers.getAllInvestorsWithProjectName)
router.get('/investorsPro/:id',investorControllers.getInvestorWithProjectNameById)
router.get('/investors/:id',investorControllers.getInvestorById)
router.post('/investor',investorControllers.addInvestor)
router.put('/investor/:id',investorControllers.updateInvestorById)
router.delete('/investor/:id',investorControllers.deleteInvestorById)

module.exports = router