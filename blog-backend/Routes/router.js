const express = require('express')

const userController = require('../Controllers/userController')

const contentSchema =require('../Controllers/contentController')

//create a router object of express to define a path
const router = new express.Router()


//register API path
router.post('/register', userController.register)

//login API path
router.post('/login', userController.login)


//New post API path
router.post('/newPost', contentSchema.newPost)

//New Comment path
router.post('/:postId/newComment',contentSchema.newComment)

//All Post path
router.get('/blogPosts',contentSchema.blogPosts)

module.exports = router 