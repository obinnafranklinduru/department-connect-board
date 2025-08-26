const NoticeModel = require("../models/noticeModel");
const {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require("./FactoryController.js");

exports.getAllNotice = getAll(Notice);
exports.getSingleNotice = getOne(Notice);
exports.editNotice = updateOne(Notice);
exports.deleteNotice = deleteOne(Notice);
exports.uploadNotice = createOne(Notice);

exports.uploadNoticeImg = catchAsync(async (req, res, next) => {
  if (req.file && req.body.refId) {
    req.body.imageUrl = req.file.path;
  }
  next();
});
