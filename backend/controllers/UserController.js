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
  req.params.id = req.user._id;
  next();
};

exports.updateMe = async (req, res, next) => {
  try {
    if (req.body.password) delete req.body.password;

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
      "semester"
    );

    // If file uploaded, add profileImg URL
    if (req.file) filteredBody.profileImg = req.file.path;

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

// SUPER ADMIN: Update user fields like status, role, or isAdmin
exports.superAdminUpdateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Only allow these fields to be updated by super admin
    const allowedUpdates = ["status", "role", "isAdmin"];
    const updates = {};

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedUser = await UserModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ status: "fail", message: "No user found with that ID" });
    }

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
