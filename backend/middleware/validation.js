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
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),

    body("studentId")
      .optional()
      .trim()
      .isLength({ min: 5, max: 20 })
      .withMessage("Student ID must be between 5 and 20 characters"),

    handleValidationErrors,
  ],

  login: [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),

    body("password").notEmpty().withMessage("Password is required"),

    handleValidationErrors,
  ],
};

module.exports = { userValidation, handleValidationErrors };
