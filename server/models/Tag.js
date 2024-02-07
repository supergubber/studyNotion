const mongoose = require('mongoose')
const tagsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  },
})

module.mongoose = mongoose.model('Tags', tagsSchema)
