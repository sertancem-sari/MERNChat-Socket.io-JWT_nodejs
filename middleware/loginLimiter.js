const expressLimit = require('express-rate-limit')

const loginLimitter = expressLimit({
    windowMs: 60 * 1000,
    max: 5,
    message:
        { message: 'Maximum login request exceeded'},
    standardHeaders: true,
    legacyHeaders: false,
})

module.exports = loginLimitter