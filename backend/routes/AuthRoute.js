const { Router } = require("express");
const {
  register,
  login,
  logout,
  updatePassword,
} = require("../controllers/AuthContoller");
const { userValidation } = require("../middleware/validation");
const { upload, handleUploadError } = require("../middleware/upload");
const { protectAuth } = require("../middleware/auth.js");

const router = Router();

// Auth Routes
router.post(
  "/register",
  upload.single("profileImg"),
  handleUploadError,
  userValidation.register,
  register
);
router.post("/login", userValidation.login, login);

router.get("/logout", logout);

router.use(protectAuth);
router.patch("/update-password", updatePassword);

module.exports = router;
