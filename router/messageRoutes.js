const express = require('express')
const router = express.Router()
const messageControllers = require('../controller/messageControllers')
const verifyJwt = require('../middleware/verifyJwt')

router.use(verifyJwt)

router.route('/')
    .get(messageControllers.getAllMessages)
    .post(messageControllers.createNewMessage)

module.exports = router