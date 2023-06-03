const OTP = require("../models/otp");
const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../utils/sendEmail");
require("dotenv").config();

const sendOTP = async ({ email, subject, message, duration = 1 }) => {
  try {
    // Clear any old record
    await OTP.deleteOne({ email });

    // Generate pin
    const pin = await generateOTP();

    // Send email
    const mailOptions = {
      from: process.env.EMAIL,
      to: "terencefaid@gmail.com",
      subject: "OTP Verification Code",
      html: `<p>${message}</p><p style="color: tomato; font-size: 25px; letter-spacing: 2px;"><b>${pin}</b></p><p>This code expires in <b>${duration} hours</b>.</p>`,
    };
    await sendEmail(mailOptions);

    // Save OTP record
    const otp = new OTP({
      email,
      pin,
      createdAt: Date.now(),
      expiresAt: Date.now() + duration * 3600000,
    });
    const createdOTPRecord = await otp.save();
    return createdOTPRecord;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  sendOTP,
};
