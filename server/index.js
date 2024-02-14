const express = require('express')
require('dotenv').config()

const app = express()

const userRoutes = require('./routes/User')
const profileRoutes = require('./routes/Profile')
const paymentRoutes = require('./routes/Payments')
const courseRoutes = require('./routes/Course')

const cookieParser = require('cookie-parser')
const database = require('./configs/database')
const cors = require('cors')
const { clodinaryConnect } = require('./configs/cloudinary')
const fileUpload = require('express-fileupload')

//connect the database

const PORT = process.env.PORT || 5000

/// /// DATABASE CONNECT
database()

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)
app.use(
  fileUpload({
    useTempFiles: true,
    temFileDir: '/tmp',
  })
)

//cloudinary Connection
clodinaryConnect()

//routes mount

app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/profile', profileRoutes)
app.use('/api/v1/course', courseRoutes)
app.use('/api/v1/payment', paymentRoutes)

//def route
app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Your server is up and running....',
  })
})

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`)
})
