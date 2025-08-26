const User = require("../models/UserModel");
const { verifyToken } = require("../utils/jwt-token");

const protectAuth = async (req, res, next) => {
  try {
    let token;

    if (req.cookies && req.cookies.jwt) token = req.cookies.jwt;

    if (
      !token &&
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    console.log("Auth token:", token);

    if (!token) {
      return res.status(401).json({ message: "Access token is required" });
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid token or user deactivated" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Admin authorization middleware
const adminAuth = (req, res, next) => {
  if (req.user.isAdmin !== true && req.user.role !== "lecturer") {
    return res.status(403).json({
      message: "Access denied. Admin or faculty privileges required.",
    });
  }
  next();
};

// Student authorization middleware
const studentAuth = (req, res, next) => {
  if (req.user.role === "student" || req.user.role === "lecturer") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied" });
  }
};

module.exports = { protectAuth, adminAuth, studentAuth };
