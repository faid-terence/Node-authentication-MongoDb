const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const existUser = await User.findOne({ email: email });
  if (existUser) {
    if (bcrypt.compareSync(password, existUser.password)) {
      const token = jwt.sign({ id: existUser._id, email: existUser.email }, "secret", {
        expiresIn: "1d",
      });
      res.status(200).json({
        message: "Login success",
        token: token,
      });
    } else {
      res.status(401).json({
        message: "Invalid email or password",
      });
    }
  } else {
    res.status(401).json({
      message: "Invalid email or password",
    });
  }
};

module.exports = {
    loginUser,
}