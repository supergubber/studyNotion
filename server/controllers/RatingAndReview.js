const RatingAndReview = require('../models/RatingAndReview')
const Course = require('../models/Course')

//createRating
exports.createRating = async (req, res) => {
  try {
    //get user id
    const userId = req.user.id
    //fetch data from req body
    const { rating, review, courseId } = req.body
    //check if user is enrolled or not
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    })
    //check if user already reviewed the course
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: 'Student is not enrolled in the course',
      })
    }

    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    })
    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: 'Course is already review by the user',
      })
    }
    //create rating and review
    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    })
    //update course with this rating/review
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { ratingAndReviews: ratingReview._id },
      },
      { new: true }
    )
    console.log(updatedCourseDetails)
    //return response
    return res.status(200).json({
      success: true,
      message: 'Rating and Review create Successfully',
      ratingReview,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//getAverageRating
exports.getAverageRating = async (req, res) => {
  try {
    //get course ID
    const courseId = req.body.courseId
    //calculate avf rating
    const result = await RatingAndReview.aggregate(
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
        },
      }
    )
    //return rating
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      })
    }
    //if no rating/Review exit
    return res.status(200).json({
      success: true,
      message: 'Average Rating is 0, no ratings givin til now',
      averageRating: 0,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
//getAllRatingAndReview
exports.getAllRating = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .populate({
        path: 'user',
        select: 'firstName lastName email image',
      })
      .populate({ path: 'course', select: 'courseName' })
      .exec()
    return res.status(200).json({
      success: true,
      message: 'All reviews fetched successfully',
      data: allReviews,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
