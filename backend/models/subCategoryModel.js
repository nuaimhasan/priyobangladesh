const mongoose = require("mongoose");
const News = require("./newsModel");

const subCategorySchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    nameEN: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: false }
);

subCategorySchema.pre("findOneAndDelete", async function (next) {
  const subCategoryId = this.getQuery()._id;
  const newsCount = await News.countDocuments({ subCategory: subCategoryId });

  if (newsCount > 0) {
    const error = new Error(
      "Cannot delete category with associated news articles."
    );

    return next(error);
  }

  next();
});

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategory;
