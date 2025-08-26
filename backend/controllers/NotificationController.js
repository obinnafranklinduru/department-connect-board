import Notification from "../models/NotificationModel.js";
const {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require("./FactoryController.js");

export const getAllNotification = getAll(Notification);
export const getSingleNotification = getOne(Notification);
export const editNotification = updateOne(Notification);
export const deleteNotification = deleteOne(Notification);
export const uploadNotification = createOne(Notification);
