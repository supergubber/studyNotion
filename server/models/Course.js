const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
  },
  courseDescription: {
    type: String,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  whatYoWilLearn: {
    type: String,
  },
  courseContent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
  },
  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RatingAndReview',
    },
  ],
  price: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  tag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
  },
  studentsEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  ],
})

module.exports = mongoose.model('Course', courseSchema)
