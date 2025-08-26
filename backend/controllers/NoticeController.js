const NoticeModel = require("../models/noticeModel");
const { deleteOne, getAll, getOne } = require("./FactoryController.js");

exports.getAllNotice = getAll(NoticeModel);
exports.getSingleNotice = getOne(NoticeModel);
exports.deleteNotice = deleteOne(NoticeModel);

exports.uploadNotice = async (req, res, next) => {
  try {
    let imageUrl = "";
    if (req.file) imageUrl = req.file.path;

    const { title, description, refId } = req.body;
    const newNotice = await NoticeModel.create({
      title,
      description,
      refId,
      imageUrl,
    });

    res.status(201).json({
      status: "success",
      data: {
        notice: newNotice,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.editNotice = async (req, res, next) => {
  try {
    let imageUrl = "";
    if (req.file) imageUrl = req.file.path;

    const { title, description, refId } = req.body;
    const updatedData = { title, description, refId };
    if (imageUrl) updatedData.imageUrl = imageUrl;

    const updatedNotice = await NoticeModel.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedNotice) {
      return res.status(404).json({
        status: "fail",
        message: "No notice found with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        notice: updatedNotice,
      },
    });
  } catch (err) {
    next(err);
  }
};
