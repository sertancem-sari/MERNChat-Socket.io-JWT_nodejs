const User = require('../MongoDB/models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const getAllUsers = asyncHandler(async (req,res) => {
    const users = await User.find().select('-password').lean()
    if(!users?.length) {
        return res.status(400).json({message:'No user found'})
    }
    res.json(users)
})

const createNewUser = asyncHandler(async (req,res) => {
    const {username, password} = req.body
    if(!username || !password) {
        return res.status(206).json({message:'All fileds are required'})
    }
    
    const duplicate = await User.findOne({username}).lean().exec()
    if(duplicate) {
        return res.status(409).json({message:'Username already exist'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const userInputs = {username, "password": hashedPassword}

    const newUser = await User.create(userInputs)
    if(newUser) {
        res.status(201).json({message: `User ${username} created`})
    }else{
        res.status(400).json({message:'Can not create new user'})
    }
})

const updateUser = asyncHandler(async (req,res) => {
    const {id, username, password} = req.body
    if(!id || !username) {
        return res.status(206).json({message:'All fileds are required'})
    }

    const foundUser = await User.findById(id).exec()
    if(!foundUser) {
        return res.status(204).json({message:'User not found'})
    }

    const duplicate = await User.findOne({username}).lean().exec()
    if(duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message:'Username duplicated'})
    }

    foundUser.username = username
    if(password){
        foundUser.password = await bcrypt.hash(password, 10)
    }
    const updateUser = await foundUser.save()
    res.json({message:`${foundUser.username} updated`})
})

const deleteUser = asyncHandler(async (req,res) => {
    const { id } =req.body
    if(!id) {
        return res.status(400).json({message:'User id required'})
    }
    
    const user = await User.findById(id).exec()
    if(!user) {
       return res.status(400).json({message:'User not found'})
    }

    const result = await user.deleteOne()

    res.json({message:`${result.username} deleted`})
})

module.exports = {getAllUsers, createNewUser, updateUser, deleteUser}