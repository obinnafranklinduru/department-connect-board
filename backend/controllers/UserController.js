const User = require("../models/UserModel");
const {
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require("./FactoryController.js");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = async (req, res, next) => {
  try {
    if (req.body.password) {
      return next(
        new Error(
          "This route is not for password updates. Please use /update-my-password."
        )
      );
    }

    // Filter allowed fields
    const filteredBody = filterObj(
      req.body,
      "name",
      "email",
      "mobile",
      "gender",
      "regNo",
      "course",
      "department",
      "semester",
      "role"
    );

    // If file uploaded, add profileImg URL
    if (req.file) {
      filteredBody.profileImg = req.file.path; // Cloudinary URL
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = getAll(User);
exports.getUser = getOne(User);
exports.updateUser = updateOne(User);
exports.deleteUser = deleteOne(User);
