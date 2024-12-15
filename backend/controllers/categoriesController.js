const slugify = require("slugify");
const Categories = require("../models/categoriesModel");

exports.addCategory = async (req, res) => {
  try {
    const data = req.body;
    const slug = slugify(data?.categoryEN);

    const newData = {
      category,
      order,
      slug,
    };

    const result = await Categories.create(newData);

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
    const category = await Categories.findById(id).populate("subCategories");

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
    const slug = slugify(data?.categoryEN);

    let newData = {
      ...data,
      slug,
    };

    const result = await Categories.findByIdAndUpdate(id, newData, {
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
