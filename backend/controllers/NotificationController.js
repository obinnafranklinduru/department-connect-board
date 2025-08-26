import Notification from "../models/NotificationModel.js";
const {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require("./FactoryController.js");

exports.getAllNotification = getAll(Notification);
exports.getSingleNotification = getOne(Notification);
exports.editNotification = updateOne(Notification);
exports.deleteNotification = deleteOne(Notification);
exports.uploadNotification = createOne(Notification);
