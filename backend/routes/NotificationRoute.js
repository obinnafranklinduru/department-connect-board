const { Router } = require("express");
const { protectAuth, adminAuth } = require("../middleware/auth.js");
const {
  deleteNotification,
  editNotification,
  getAllNotification,
  getSingleNotification,
  uploadNotification,
} = require("../controllers/NotificationController.js");

const router = Router();

router.use(protectAuth);
router.get("/", getAllNotification);
router.get("/:id", getSingleNotification);
router.delete("/:id", deleteNotification);

//restrict to admin
router.use(adminAuth);
router.post("/", uploadNotification);
router.patch("/:id", editNotification);

module.exports = router;
