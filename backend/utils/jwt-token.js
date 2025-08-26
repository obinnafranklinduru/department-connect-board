const jwt = require("jsonwebtoken");

// Generate Access Token
exports.generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Verify Token
exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
