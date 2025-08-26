const { Router } = require("express");
const { register, login, logout } = require("../controllers/AuthContoller");
const { userValidation } = require("../middleware/validation");
const { upload, handleUploadError } = require("../middleware/upload");

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

module.exports = router;
