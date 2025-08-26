// const { Router } = require("express");
// const { protectAuth, adminAuth } = require("../middleware/auth.js");
// const {
//   deleteNotice,
//   editNotice,
//   getAllNotice,
//   getSingleNotice,
//   uploadNotice,
//   uploadNoticeImg,
// } = require("./noticeController.js");

// const router = Router();

// router.get("/", getAllNotice);

// router.get("/:id", getSingleNotice);

// //restrict to admin
// router.use(protectAuth, adminAuth);
// router.post("/", uploadNoticeImg, uploadNotice);
// router.patch("/:id", uploadNoticeImg, editNotice);
// router.delete("/:id", deleteNotice);

// export default router;
