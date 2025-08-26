const { Router } = require("express");
const { protectAuth, adminAuth } = require("../middleware/auth.js");
const { upload, handleUploadError } = require("../middleware/upload");
const {
  updateMe,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  getMe,
  superAdminUpdateUser,
} = require("../controllers/UserController");

const router = Router();

router.use(protectAuth);
router.get("/me", getMe, getUser);
router.patch(
  "/updateMe",
  upload.single("profileImg"),
  handleUploadError,
  updateMe
);

// Access to admins only
router.use(adminAuth);
router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
router.patch("/:id/super-update", superAdminUpdateUser);

module.exports = router;
