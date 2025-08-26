const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    refId: {
      type: String,
      required: [true, "Please enter notice reference Id!"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },
    imageUrl: {
      type: String,
      required: [true, "Please provide image!"],
    },
  },
  {
    timestamps: true,
  }
);

// Index for text search
noticeSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Notice", noticeSchema, "notices");
