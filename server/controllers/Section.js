const Section = require('../models/Section')
const Course = require('../models/Course')

exports.createSection = async (req, res) => {
  try {
    //data fetch
    const { sectionName, courseId } = req.body
    //data validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: 'Missing Properties',
      })
    }
    //create section
    const newSection = await Section.create({ sectionName })
    //update course with section ObjectId
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
    //TODO:use populate to replace section/subsection both
    //return response
    return res.status(200).json({
      success: false,
      message: 'Section created successfully',
      updatedCourseDetails,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to create Section, please try again',
      error: error.message,
    })
  }
}

//update section
exports.updateSection = async (req, res) => {
  try {
    //data input
      const { sectionName, sectionId } = req.body
    //data validation
      if (!sectionName || !sectionId) {
        return res.status(400).json({
          success: false,
          message: 'Missing Properties',
        })
      }
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
        message: 'Section Updated Successfully',
        data: section,
      })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to update Section, Please try again',
      error: error.message,
    })
  }
}

exports.deleteSection = async (req, res) => {
  try {
    //get ID - assuming that we are sanding ID in params
    const { sectionId } = req.params
    //use findByIdAndDelete
    await Section.findByIdAndDelete(sectionId)
    //TODO: do we need to delete the entry form the course schema??
    //return response
    return res.status(200).json({
      success: false,
      message: 'Section Deleted Successfully',
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to delete Section, Please try again',
      error: error.message,
    })
  }
}
