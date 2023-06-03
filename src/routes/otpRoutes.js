const express = require('express');
const router = express.Router();
const { sendOTP } = require('../controller/otpController');

router.post('/', async (req, res) => {
  try {
    const { email, subject, message, duration } = req.body;
    const otp = await sendOTP({ email, subject, message, duration }); // Pass the request body as an object
    res.status(200).json({
      status: 'success',
      data: otp,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

module.exports = router;
