const Message = require('../MongoDB/models/Message')
const asyncHandler = require('express-async-handler')

const getAllMessages = asyncHandler(async (req,res) => {
    const sentences = await Message.find().lean()
    if(!sentences?.length) {
        return res.status(400).json({message:'No message foundd'})
    }
    res.json(sentences)
})

const createNewMessage = asyncHandler(async (req,res) => {
    const {sentence} = req.body
    if(!sentence) {
        return res.status(206).json({message:'All fileds are required'})
    }
    const messageInput= {sentence}
    const newMessage = await Message.create(messageInput)
    if(newMessage) {
        res.status(201).json({message: 'Message created'})
    }else{
        res.status(400).json({message:'Can not create new message'})
    }
})

module.exports = {getAllMessages, createNewMessage}