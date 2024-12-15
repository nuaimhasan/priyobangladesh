const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    titleEN: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    details: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    subCategory: {
      type: mongoose.Types.ObjectId,
      ref: "SubCategory",
    },
    writer: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "active"],
    },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("News", newsSchema);

module.exports = News;
