const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  // check for token Provided
  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid Token",
    });
  }
};
module.exports = verifyToken;
