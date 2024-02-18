const express = require('express')

const userController = require('../Controllers/userController')


//create a router object of express to define a path
const router = new express.Router()


//register API path
router.post('/register', userController.register)

//login API path
router.post('/login', userController.login)
module.exports = router 

