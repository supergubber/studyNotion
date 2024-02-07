const User = require('../models/User')
const OTP = require('../models/OTP')
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')
const Profile = require('../models/Profile')
const jwt = require('jsonwebtoken')
require('dotenv').config()
//sendOTP
exports.sendOTP = async (req, res) => {
  try {
    //fetch email from request ki body
    const { email } = req.body
    //check if user already exist
    const checkUserPresent = await User.findOne({ email })
    //if user already exist return response
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: 'User already registered',
      })
    }
    //generate otp
    var otp = otpGenerator(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    })
    console.log('OTP GENERATOR: ', otp)

    //check unique otp or not
    const result = await OTP.findOne({ otp: otp })

    while (result) {
      otp = otpGenerator(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      })
      result = await OTP.findOne({ otp: otp })
    }

    const otpPayload = { email, otp }

    //created an entry for otp
    const otpBody = await OTP.create(otpPayload)
    console.log('otp body : ', otpPayload)
    //return response successfully
    res.status(200).json({
      success: false,
      message: 'OTP Send Successfully',
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
// /signUp
exports.signUp = async (req, res) => {
  try {
    //data fetch form request ki body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body
    //validate karlo
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(401).json({
        success: false,
        message: 'All fields are required',
      })
    }
    //2 password match karlo
    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message:
          'password and confirm password value does not match , please try again',
      })
    }
    //check user already exit or not
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'user is already registered',
      })
    }
    //find most recent OTP stored for the user
    const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)
    //validate OTP
    if (recentOtp.length == 0) {
      return res.status(400).json({
        success: false,
        message: 'OTP Found',
      })
    } else if (otp !== recentOtp) {
      //INVALID OTP
      return res.status(400).json({
        success: false,
        message: 'InvAlid OTP',
      })
    }
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    //entry create in DB
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    })
    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image:
        'https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}',
    })
    //return res
    return res.status(200).json({
      success: true,
      message: 'User is registered successfully',
      user,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: flase,
      message: 'User cannot be registered. Please try again',
    })
  }
}
//Login
exports.login = async (req, res) => {
  try {
    //get data form req body
    const { email, password } = req.body
    //validation data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: 'All fields are required, please try again',
      })
    }
    //user check exist or not
    const user = await User.findOne({ email }).populate('additionalDetails')
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User is not registered please signup first',
      })
    }
    //generate JWT, after password matching

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        role: user.role,
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expireIn: '2h',
      })
      user.token = token
      user.password = undefined
      //create cookie and send cookies
      const option = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      }
      res.cookie('token', token, option).status(200).json({
        success: true,
        token,
        user,
        message: 'Logged in successfully',
      })
    } else {
      return res.status(401).json({
        success: false,
        message: 'Password is incorrect',
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Login Failure please try again',
    })
  }
}
//changePassword
//TODO: HOMEWORK
exports.changePassword = async (req, res) => {
  //get data form req body
  //get oldPassword, newPassword, confirmNewPassword
  //update pwd in DB
  //send mail - password updated
  //return response
}
