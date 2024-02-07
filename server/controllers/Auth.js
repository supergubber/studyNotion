const User = require('../models/User')
const OTP = require('../models/OTP')
const otpGenerator = require('otp-generator')
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
exports.signUp = async (req,res) =>{}
//Login
//changePassword
