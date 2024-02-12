const User = require('../models/User')
const mailSender = require('../utils/mailSender')
const bcrypt = require('bcrypt')
//resetPasswordToken

// exports.resetPasswordToken = async (req, res) => {
//   try {
//     //get email form req body
//     const email = req.body.email
//     //check user for this email email validation
//     const user = await User.findOne({ email: email })
//     if (!user) {
//       return res.json({
//         success: false,
//         message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
//       })
//     }
//     const token = crypto.randomBytes(20).toString('hex')
//     //update user by adding token and expiration time
//     const updatedDetails = await User.findByIdAndUpdate(
//       { email: email },
//       {
//         token: token,
//         resetPasswordToken: Date.now() + 3600000,
//       },
//       { new: true }
//     )
//     console.log('DETAILS', updatedDetails)

//     //create url
//     const url = `http://localhost:3000/update-password/${token}`

//     //send mail containing the url
//     await mailSender(
//       email,
//       'Password Reset',
//       `Your Link for email verification is ${url}. Please click this url to reset your password.`
//     )
//     //return response
//     return res.json({
//       success: true,
//       message:
//         'Email Sent Successfully, Please Check Your Email to Continue Further',
//     })
//   } catch (error) {
//     return res.json({
//       error: error.message,
//       success: false,
//       message: `Some Error in Sending the Reset Message`,
//     })
//   }
// }
// //resetPassword

// exports.resetPassword = async (req, res) => {
//   try {
//     //data fetch
//     const { password, confirmPassword, token } = req.body
//     //validation
//     if (confirmPassword !== password) {
//       return res.json({
//         success: false,
//         message: 'Password and Confirm Password Does not Match',
//       })
//     }
//     //get userdetails form db user token
//     const userDetails = await User.findOne({ token: token })
//     //if no entry - invalid token
//     if (!userDetails) {
//       return res.json({
//         success: false,
//         message: 'Token is invalid',
//       })
//     }
//     //token time check
//     if (!(userDetails.resetPasswordExpires > Date.now())) {
//       return res.status(403).json({
//         success: false,
//         message: `Token is Expired, Please Regenerate Your Token`,
//       })
//     }
//     //password update
//     const encryptedPassword = await bcrypt.hash(password, 10)
//     await User.findOneAndUpdate(
//       { token: token },
//       { password: encryptedPassword },
//       { new: true }
//     )
//     res.json({
//       success: true,
//       message: `Password Reset Successful`,
//     })
//   } catch (error) {
//     return res.json({
//       error: error.message,
//       success: false,
//       message: `Some Error in Updating the Password`,
//     })
//   }
// }

exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.json({
        success: false,
        message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
      })
    }
    const token = crypto.randomBytes(20).toString('hex')

    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000,
      },
      { new: true }
    )
    console.log('DETAILS', updatedDetails)

    const url = `http://localhost:3000/update-password/${token}`

    await mailSender(
      email,
      'Password Reset',
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    )

    res.json({
      success: true,
      message:
        'Email Sent Successfully, Please Check Your Email to Continue Further',
    })
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Sending the Reset Message`,
    })
  }
}

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body

    if (confirmPassword !== password) {
      return res.json({
        success: false,
        message: 'Password and Confirm Password Does not Match',
      })
    }
    const userDetails = await User.findOne({ token: token })
    if (!userDetails) {
      return res.json({
        success: false,
        message: 'Token is Invalid',
      })
    }
    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: `Token is Expired, Please Regenerate Your Token`,
      })
    }
    const encryptedPassword = await bcrypt.hash(password, 10)
    await User.findOneAndUpdate(
      { token: token },
      { password: encryptedPassword },
      { new: true }
    )
    res.json({
      success: true,
      message: `Password Reset Successful`,
    })
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Updating the Password`,
    })
  }
}
