const slugify = require("slugify");
const Categories = require("../models/categoriesModel");
const makeSlug = require("../utils/makeSlug");

exports.addCategory = async (req, res) => {
  try {
    const { category, order } = req.body;

    const data = {
      category,
      order,
      slug: makeSlug(category),
    };

    const result = await Categories.create(data);

    res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    let categories = await Categories.find({})
      .sort({ order: 1 })
      .populate("subCategories");

    res.status(200).json({
      success: true,
      message: "All categories",
      data: categories,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Categories.findOne({ _id: id }).populate(
      "subCategories"
    );

    res.status(200).json({
      success: true,
      message: "Category found successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req?.params;
    const data = req?.body;

    let categoryData = {
      ...data,
      slug: makeSlug(data?.category),
    };

    const result = await Categories.findByIdAndUpdate(id, categoryData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req?.params;
    const category = await Categories.findById(id);

    if (!category) {
      return res.json({
        success: false,
        message: "Category not found",
      });
    }

    if (category.subCategories.length > 0) {
      return res.json({
        success: false,
        message: "Category has subcategories, can not delete",
      });
    }

    await Categories.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Delete success",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
