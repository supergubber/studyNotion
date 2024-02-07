const mongoose = require('mongoose')
require('dotenv').config()
const database = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log('database connected successfully'))
    .catch((error) => {
      console.log('database not connected successfully')
      console.error(error)
      process.exit(1)
    })
}

module.exports = database
