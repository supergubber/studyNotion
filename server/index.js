const express = require('express')
require('dotenv').config()
const database = require('./configs/database')
const app = express()

//connect the database

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`server started at ${PORT}`)
})

/// /// DATABASE CONNECT
database()


//default router