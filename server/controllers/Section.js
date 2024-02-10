const Section = require('../models/Section')
const Course = require('../models/Course')

exports.createSection = async (req, res) => {
  try {
    // Extract the required properties from the request body
    const { sectionName, courseId } = req.body
    // Validate the input
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required properties',
      })
    }
    //create section
    const newSection = await Section.create({ sectionName })
    //update course with section ObjectId
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate({
        path: 'courseContent',
        populate: {
          path: 'subSection',
        },
      })
      .exec()
    //Return the updated course object in the response
    return res.status(200).json({
      success: false,
      message: 'Section created successfully',
      updatedCourse,
    })
  } catch (error) {
    //Handle errors
    return res.status(500).json({
      success: false,
      message: 'Internal server error"',
      error: error.message,
    })
  }
}

//update section
exports.updateSection = async (req, res) => {
  try {
    //data input
    const { sectionName, sectionId } = req.body
    //update data
    const section = await Section.findByIdAndUpdate(
      sectionId,
      {
        sectionName,
      },
      { new: true }
    )
    //return res
    return res.status(200).json({
      success: true,
      message: section,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

exports.deleteSection = async (req, res) => {
  try {
    //get ID - assuming that we are sanding ID in params
    const { sectionId } = req.params
    //use findByIdAndDelete
    await Section.findByIdAndDelete(sectionId)
    //return response
    return res.status(200).json({
      success: false,
      message: 'Section deleted',
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}
