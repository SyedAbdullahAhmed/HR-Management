const express = require('express')
const router = express.Router()
const employeeControllers = require('../controllers/employee')

router.get('/employeePerInfo',employeeControllers.getAllEmployeePerInfo)
router.get('/employeePerInfo/:id',employeeControllers.getEmployeeByIdPerInfo)
router.post('/employeePerInfo',employeeControllers.addEmployeePerInfo)
router.put('/employeePerInfo/:id',employeeControllers.updateEmployeePerInfo)
router.delete('/employeePerInfo/:id',employeeControllers.deleteEmployeePerInfo)

router.get('/employeeNameAndPosition',employeeControllers.getAllEmployeeNameAndPosition)

router.get('/employeeCarInfo',employeeControllers.getAllEmployeeCarInfo)
router.get('/employeeCarInfo/:id',employeeControllers.getEmployeeByIdCarInfo)
router.post('/employeeCarInfo',employeeControllers.addEmployeeCarInfo)
router.put('/employeeCarInfo/:id',employeeControllers.updateEmployeeCarInfo)
router.delete('/employeeCarInfo/:id',employeeControllers.deleteEmployeeCarInfo)

module.exports = router