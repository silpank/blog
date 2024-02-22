const express = require('express')

const userController = require('../Controllers/userController')

const contentSchema =require('../Controllers/contentController')

const jwtMiddleware = require('../Middlewares/jwtMiddleware')

//create a router object of express to define a path
const router = new express.Router()

//register API path
router.post('/register', userController.register)

//login API path
router.post('/login', userController.login)


//New post API path
router.post('/newPost',jwtMiddleware, contentSchema.newPost)

//New Comment path
router.post('/:postId/newComment',jwtMiddleware,contentSchema.newComment)

//All Post path
router.get('/allPosts',jwtMiddleware,contentSchema.getAllPosts)

//Add Like
router.post('/:postId/addLike',jwtMiddleware,contentSchema.addLike)

module.exports = router 