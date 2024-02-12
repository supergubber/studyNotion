const Profile = require('../models/Profile')
const User = require('../models/User')
require('dotenv').config()
const { uploadImageToCloudinary } = require('../utils/imageUploader')
exports.updateProfile = async (req, res) => {
  try {
    const { dateOfBirth = '', about = '', contactNumber } = req.body
    const id = req.user.id
    // Find the profile by id
    const userDetails = await User.findById(id)
    const profile = await Profile.findById(userDetails.additionalDetails)

    //update profile
    profile.dateOfBirth = dateOfBirth
    profile.about = about
    profile.contactNumber = contactNumber
    await profileDetails.save()
    //return response
    return res.status(200).json({
      success: true,
      message: 'profile updated successfully',
      profileDetails,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

//delete Account
//Explore => how can we schedule this deletion operation
exports.deleteAccount = async (req, res) => {
  try {
    // TODO: Find More on Job Schedule
    // const job = schedule.scheduleJob("10 * * * * *", function () {
    // 	console.log("The answer to life, the universe, and everything!");
    // });
    // console.log(job);
    //get id
    const id = req.user.id
    //validation
    const user = await User.findById({ _id: id })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }
    //delete profile
    //await Profile.findByIdAndUpdate({ _id: userDetails.additionalDetails })
    await Profile.findByIdAndDelete({ _id: user.userDetails })
    // TODO: Unenroll User From All the Enrolled Courses
    // Now Delete User
    await User.findByIdAndDelete({ _id: id })
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'User cannot be deleted successfully',
    })
  }
}

exports.getAllUserDetails = async (req, res) => {
  try {
    //get id
    const id = req.user.id
    //get user details
    const userDetails = await User.findById(id)
      .populate('additionalDetails')
      .exec()
    console.log('userDetails :', userDetails)
    //validation
    // if (!userDetails) {
    //     return res.json()
    // }
    //response
    return res.status(200).json({
      success: true,
      message: 'User Data Fetched Successfully',
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

//updateDisplayPicture
exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    const userDetails = await User.findOne({
      _id: userId,
    })
      .populate('courses')
      .exec()
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
