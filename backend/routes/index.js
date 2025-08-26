const { Router } = require("express");

const authRoute = require("./AuthRoute.js");
const userRoute = require("./UserRoute.js");
const emailRoute = require("./EmailRoute.js");
const noticeRoute = require("./NoticeRoute.js");
const notificationRoute = require("./NotificationRoute.js");

const router = Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/notice", noticeRoute);
router.use("/email", emailRoute);
router.use("/notification", notificationRoute);

module.exports = router;
