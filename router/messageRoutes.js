const express = require('express')
const router = express.Router()
const messageControllers = require('../controller/messageControllers')

router.route('/')
    .get(messageControllers.getAllMessages)
    .post(messageControllers.createNewMessage)

module.exports = router