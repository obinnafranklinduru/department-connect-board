// const { Router } = require("express");
// const { protectAuth, adminAuth } = require("../middleware/auth.js");
// const {
//   protect,
//   restrictToAdmin,
//   updatePassword,
//   uploadUserImage,
// } = require("../auth/authController.js");
// const {
//   addUser,
//   deleteUser,
//   getAllUsers,
//   getMe,
//   getUser,
//   updateMe,
//   updateUser,
// } = require("./userController.js");

// const router = Router();

// router.use(protect);
// router.patch("/update-my-password", updatePassword);
// router.get("/me", getMe, getUser);
// router.patch(
//   "/updateMe",
//   upload.single("profileImg"),
//   handleUploadError,
//   updateMe
// );

// //Access to admins only
// router.use(restrictToAdmin);
// router.route("/").get(getAllUsers).post(addUser);
// router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

// export default router;
