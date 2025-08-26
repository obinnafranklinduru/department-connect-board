const UserModel = require("../models/UserModel");
const NotificationModel = require("../models/NotificationModel");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} = require("../utils/jwt-token.js");

export const register = async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body);
    const notification = {
      userId: newUser._id,
      content:
        "You have regestered successfully. But your account status is pending. You can wait for the account verification by Admin. Otherwise contact your admin!",
    };

    await Notification.create(notification);

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

// LOGIN
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = generateAccessToken(user._id);

    res.json({
      message: "Login successful",
      user,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

// LOGOUT
export const logout = async (req, res) => {
  // In production, blacklist refresh token (DB/Redis)
  res.json({ message: "Logout successful. Please discard tokens on client." });
};
