const fs = require("fs");
const slugify = require("slugify");
const Categories = require("../models/categoriesModel");

exports.addCategory = async (req, res) => {
  try {
    const { category, order } = req.body;

    const categoryData = {
      category,
      order,
      slug: category.split(" ").join("-"),
    };

    const result = await Categories.create(categoryData);

    res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
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
    res.status(400).json({
      success: false,
      error: error.message,
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
      error: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req?.params;
    const data = req?.body;

    let categoryData = {
      ...data,
      slug: slugify(data?.category),
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
      error: error.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req?.params;
    const category = await Categories.findById(id);

    if (!category) {
      return res.status(400).json({
        success: false,
        error: "Category not found",
      });
    }

    await Categories.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Delete success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
