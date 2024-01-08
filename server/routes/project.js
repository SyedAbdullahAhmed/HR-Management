const express = require('express')
const router = express.Router()
const projectControllers = require('../controllers/project')

router.get('/projects',projectControllers.getAllProjects)
router.get('/projectsNames',projectControllers.getAllProjectsNames)
router.get('/projects/:id',projectControllers.getProjectById)
router.post('/projects',projectControllers.addProject)
router.put('/projects/:id',projectControllers.updateProjectById)
router.delete('/projects/:id',projectControllers.deleteProjectById)

module.exports = router