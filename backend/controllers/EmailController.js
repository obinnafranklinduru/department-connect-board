const User = require("../models/UserModel.js");
const { sendEmailToMultiple } = require("../utils/mailer.js");

exports.sendNoticeEmail = async (req, res, next) => {
  try {
    console.log("from notice email");
    const { id, title, description, refId } = req.body;

    const notice = {
      id,
      title,
      description,
      refId,
    };

    // Fetch all active users
    const activeUsers = await User.find({ status: "Active" });
    const activeUsersEmail = activeUsers.map((user) => user.email);

    console.log("Active users' emails:", activeUsersEmail);

    // Send mail
    await sendEmailToMultiple({ emails: activeUsersEmail, notice });

    res.json({ status: "success" });
  } catch (err) {
    next(err);
  }
};
