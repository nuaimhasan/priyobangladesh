const mongoose = require("mongoose");

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
  },
  { timestamps: false }
);

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategory;
