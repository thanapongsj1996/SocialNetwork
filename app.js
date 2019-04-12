const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const dotenv = require('dotenv')
dotenv.config()

// database
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}).then(() => { console.log('Database Connected') })

mongoose.connection.on('error', err => {
    console.log(`Database connection error: ${err.message}`)
})

// bring in routes
const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth')

// middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(expressValidator())
app.use('/', postRoutes)
app.use('/', authRoutes)

const port = process.env.PORT
app.listen(port, () => {
    console.log(`A NodeJS API is listening on port: ${port}`)
})