import User from "../models/UserModel.js";
import { sendEmailToMultiple } from "../utils/mailer.js";

export const sendNoticeEmail = async (req, res, next) => {
  try {
    console.log("from notice email");
    const notice = req.body;

    // Fetch all active users
    const activeUsers = await User.find({ status: "Active" });
    const activeUsersEmail = activeUsers.map((user) => user.email);

    // Send mail
    await sendEmailToMultiple({ emails: activeUsersEmail, notice });

    res.json({ status: "success" });
  } catch (err) {
    next(err);
  }
};
