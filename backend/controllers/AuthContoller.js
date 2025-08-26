const UserModel = require("../models/UserModel.js");
const NotificationModel = require("../models/NotificationModel.js");
const {
  generateAccessToken,

  verifyToken,
} = require("../utils/jwt-token.js");

exports.register = async (req, res, next) => {
  try {
    let profileImg = "";
    if (req.file) profileImg = req.file.path;

    console.log("Profile Image URL:", profileImg);

    const { name, email, password, mobile, regNo, role } = req.body;

    const existingUser = await UserModel.findOne({ email }).select("-password");
    if (existingUser) return next(new Error("Email already in use"));

    const user = new UserModel({
      name,
      email,
      password,
      mobile,
      regNo,
      role,
      profileImg,
    });
    await user.save();

    await NotificationModel.create({
      userId: user._id,
      content:
        "You have regestered successfully. But your account status is pending. You can wait for the account verification by Admin. Otherwise contact your admin!",
    });

    console.log("New user registered:", user);

    res.status(201).json({
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (err) {
    next(err);
  }
};

// LOGIN
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) return next(new Error("Invalid email or password"));

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return next(new Error("Invalid email or password"));

    const accessToken = generateAccessToken(user._id);

    const days = Number(process.env.JWT_COOKIE_EXPIRES_IN) || 7;
    res.cookie("jwt", accessToken, {
      maxAge: days * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });

    res.json({
      message: "Login successful",
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};

// LOGOUT
exports.logout = async (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};
