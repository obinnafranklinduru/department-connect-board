const { Router } = require("express");
const { protectAuth, adminAuth } = require("../middleware/auth.js");
const { upload, handleUploadError } = require("../middleware/upload");
const {
  deleteNotice,
  editNotice,
  getAllNotice,
  getSingleNotice,
  uploadNotice,
} = require("../controllers/NoticeController.js");

const router = Router();

router.get("/", getAllNotice);

router.get("/:id", getSingleNotice);

//restrict to admin
router.use(protectAuth, adminAuth);
router.post("/", upload.single("imageUrl"), handleUploadError, uploadNotice);
router.patch("/:id", upload.single("imageUrl"), handleUploadError, editNotice);
router.delete("/:id", deleteNotice);

module.exports = router;
