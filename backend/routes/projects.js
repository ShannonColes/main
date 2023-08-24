//Import express
const express = require ('express')
const router = express.Router()

//Import controllers
const {getProjects,createProject } = require ('../controllers/projectController')

router.get('/', getProjects)

router.post('/', createProject)


module.exports = router;