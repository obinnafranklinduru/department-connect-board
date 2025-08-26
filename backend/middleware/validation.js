const { body, validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};

// User validation rules
const userValidation = {
  register: [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 2, max: 50 })
      .withMessage("Name must be between 2 and 50 characters"),

    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),

    body("mobile")
      .notEmpty()
      .withMessage("Mobile number is required")
      .isMobilePhone()
      .withMessage("Please provide a valid mobile number"),

    body("profileImg").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Profile image is required");
      }
      const allowedMimes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedMimes.includes(req.file.mimetype)) {
        throw new Error("Only .jpg, .jpeg and .png formats are allowed");
      }
      return true;
    }),

    body("role")
      .optional()
      .isIn(["student", "lecturer"])
      .withMessage("Role must be either student or lecturer"),

    body("regNo")
      .optional()
      .isString()
      .withMessage("Registration number must exist"),

    body("gender")
      .optional()
      .isIn(["Male", "Female"])
      .withMessage("Gender must be Male or Female"),

    body("course")
      .optional()
      .isIn(["B-Tech", "IMBA", "M-Tech", "MBA"])
      .withMessage("Invalid course selection"),

    body("semester")
      .optional()
      .isIn(["1st", "2nd"])
      .withMessage("Invalid semester"),

    body("status")
      .optional()
      .isIn(["Active", "Pending", "Blocked"])
      .withMessage("Invalid status"),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),

    handleValidationErrors,
  ],

  login: [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),

    body("password").notEmpty().withMessage("Password is required"),

    handleValidationErrors,
  ],

  update: [
    body("name")
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Name must be between 2 and 50 characters"),

    body("email")
      .optional()
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),

    body("mobile")
      .optional()
      .isMobilePhone()
      .withMessage("Please provide a valid mobile number"),

    body("profileImg").optional().isString(),

    body("gender").optional().isIn(["Male", "Female"]),

    body("course").optional().isIn(["B-Tech", "IMBA", "M-Tech", "MBA"]),

    body("semester")
      .optional()
      .isIn(["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"]),

    body("status").optional().isIn(["Active", "Pending", "Blocked"]),

    handleValidationErrors,
  ],
};

module.exports = { userValidation, handleValidationErrors };
