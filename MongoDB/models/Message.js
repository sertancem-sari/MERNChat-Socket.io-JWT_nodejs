const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    sentence: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Message', messageSchema)