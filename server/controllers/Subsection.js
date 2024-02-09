const SubSection = require('../models/SubSection')
const Section = require('../models/Section')
require('dotenv').config()
//create Subsection

exports.createSubSection = async (req, res) => {
  try {
    //fetch data from rq body
    const { sectionId, title, timeDuration, description } = req.body
    //extract file/video
    const video = req.files.videoFile
    //validation
    if (!sectionId || !title || !timeDuration || !description) {
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
    //create a sub section
      const SubSectionDetails = await SubSection.create({
        title: title,
        timeDuration: timeDuration,
        description: description,
        videoUrl: uploadDetails.secure_url,
      })
    //update section with thi sub section ObjectId
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { SubSection: SubSectionDetails } },
      { new: true }
    )
    //Todo:HW:updated section here, after adding populate query
    //return response
    return res.status(200).json({
      success: true,
      message: 'Sub Section Created Successfully',
      updatedSection,
    })
    
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
