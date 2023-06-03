const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// test transporter

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Email verified");
    console.log(success);
  }
});

const sendEmail = async (mailOptions) => {
  try {
  await transporter.sendMail(mailOptions);
  return;
  } catch (error) {
    console.log("Error sending email");
    console.log(error);
  }
};

module.exports = sendEmail;
