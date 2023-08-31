const express = require('express')

const router = express.Router();

const { signUpUser, loginUser, getUserProfiles, getUserProjects } = require('../controllers/userController')

router.get('/profiles', getUserProfiles)
router.get('/profile/:user_id/projects', getUserProjects)

router.post('/login', loginUser)

router.post('/signup', signUpUser)

module.exports = router