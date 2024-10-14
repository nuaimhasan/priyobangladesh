const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    order: {
      type: Number,
      required: true,
    },
    subCategories: [{ type: mongoose.Types.ObjectId, ref: "SubCategory" }],
  },
  { timestamps: false }
);

const Categories = mongoose.model("Categories", CategoriesSchema);

module.exports = Categories;
