const express = require('express')
const router = express.Router()
const investorControllers = require('../controllers/investor')

router.get('/investors',investorControllers.getAllInvestors)
router.get('/investorsPro',investorControllers.getAllInvestorsWithProjectName)
router.get('/investorsPro/:id',investorControllers.getInvestorWithProjectNameById)
router.get('/investors/:id',investorControllers.getInvestorById)
// router.post('/investors',investorControllers.addInvestor)
// router.put('/investors/:id',investorControllers.updateInvestorById)
// router.delete('/investors/:id',investorControllers.deleteInvestorById)

module.exports = router