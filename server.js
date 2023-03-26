require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./cors/corsOptions')
const mongoConnection = require('./MongoDB/mongoConnection')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3500

mongoConnection()

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', require('./router/root'))
app.use('/users', require('./router/userRoutes'))

app.all('*', (req,res) => {
    res.status(404)
    res.sendFile(path.join(__dirname, 'html', '404.html'))
})

mongoose.connection.once('open', () => {
    console.log('Connected to DATABASE')
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
})

