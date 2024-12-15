const mongoose = require("mongoose");
const News = require("./newsModel");

const CategoriesSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true,
    },
    categoryEN: {
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
    order: {
      type: Number,
      required: true,
    },
    subCategories: [{ type: mongoose.Types.ObjectId, ref: "SubCategory" }],
  },
  { timestamps: false }
);

CategoriesSchema.pre("findOneAndDelete", async function (next) {
  const categoryId = this.getQuery()._id;
  const newsCount = await News.countDocuments({ category: categoryId });

  if (newsCount > 0) {
    const error = new Error(
      "Cannot delete category with associated news articles."
    );
    error.status = 400;
    return next(error);
  }

  next();
});

const Categories = mongoose.model("Categories", CategoriesSchema);

module.exports = Categories;
