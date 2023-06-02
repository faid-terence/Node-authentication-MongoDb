const User = require("../models/User");
const bcrypt = require('bcrypt');

const userRegister = async (req, res) => {
  const { FirstName, LastName, email, password } = req.body;

  // Check if any of the required fields is missing
  if (!FirstName || !LastName || !email || !password) {
    return res.status(400).json({ error: "Please provide all required fields" });
  }

  const user = await User.findOne({ email: email });
  if (user) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newUser = new User({
    FirstName,
    LastName,
    email,
    password,
  });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newUser.password, salt);
  newUser.password = hashedPassword;

  await newUser.save();
  res.status(201).json({ message: "User created" });
};

module.exports = {
  userRegister: userRegister
};
