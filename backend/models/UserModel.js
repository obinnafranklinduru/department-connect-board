const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please provide a valid email!"],
    },
    mobile: {
      type: Number,
      required: [true, "Please provide your mobile number!"],
    },
    profileImg: {
      type: String,
      required: [true, "Image is required!"],
    },
    role: {
      type: String,
      enum: ["student", "lecturer"],
      default: "student",
    },
    regNo: {
      type: String,
      sparse: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    course: {
      type: String,
      enum: ["B-Tech", "IMBA", "M-Tech", "MBA"],
    },
    department: {
      type: String,
      default: "Software Engineering",
    },
    semester: {
      type: String,
      enum: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"],
    },
    status: {
      type: String,
      enum: ["Active", "Pending", "Blocked"],
      default: "Pending",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    passwordChangedAt: {
      type: Date,
      select: false,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpires: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

// To select only active users
userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method the check if user has changed password after token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    // console.log(changedTimeStamp, JWTTimestamp);

    return JWTTimestamp < changedTimeStamp;
  }

  // False means password not changed
  return false;
};

module.exports = mongoose.model("User", userSchema, "users");
