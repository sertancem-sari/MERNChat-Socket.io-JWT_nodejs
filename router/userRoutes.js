const express = require('express')
const router = express.Router()
const userControllers = require('../controller/userControllers')
const verifyJwt = require('../middleware/verifyJwt')

router.use(verifyJwt)

router.route('/')
    .get(userControllers.getAllUsers)
    .post(userControllers.createNewUser)
    .patch(userControllers.updateUser)
    .delete(userControllers.deleteUser)

module.exports = router