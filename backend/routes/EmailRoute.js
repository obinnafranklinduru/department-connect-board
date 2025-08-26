const { Router } = require("express");
const { protectAuth, adminAuth } = require("../middleware/auth.js");
const { sendNoticeEmail } = require("../controllers/EmailController.js");

const router = Router();

router.use(protectAuth, adminAuth);
router.post("/send-notice-email", sendNoticeEmail);

module.exports = router;
