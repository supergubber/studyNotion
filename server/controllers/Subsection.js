const SubSection = require('../models/SubSection')
const Section = require('../models/Section')
require('dotenv').config()
//create Subsection

exports.createSubSection = async (req, res) => {
  try {
    // Extract necessary information from the request body
    const { sectionId, title, timeDuration, description } = req.body
    const video = req.files.videoFile
    // Check if all necessary fields are provided
    if (!sectionId || !title || !timeDuration || !description || !video) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      })
    }
    //upload video to cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    )
    // Create a new sub-section with the necessary information
    const SubSectionDetails = await SubSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: uploadDetails.secure_url,
    })
    // Update the corresponding section with the newly created sub-section
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { SubSection: SubSectionDetails._id } },
      { new: true }
    ).populate('subSection')
    // Return the updated section in the response
    return res.status(200).json({ success: true, data: updatedSection })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'internal Server error',
      error: error.message,
    })
  }
}

//TODO:hw updated subsection
//TODO: deleteSubsection
