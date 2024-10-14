const Categories = require("../models/categoriesModel");
const SubCategory = require("../models/subCategoryModel");

exports.add = async (req, res) => {
  try {
    const data = req.body;

    const info = {
      ...data,
      slug: data?.name?.split(" ").join("-"),
    };

    const result = await SubCategory.create(info);

    if (result?._id) {
      await Categories.findByIdAndUpdate(
        data?.category,
        { $push: { subCategories: result?._id } },
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: "add success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category && category != "undefined" && category != "null")
      query.category = category;

    let result = await SubCategory.find(query)
      .sort({ order: 1 })
      .populate("category");

    res.status(200).json({
      success: true,
      message: "All categories",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getSingle = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Categories.findOne({ _id: id }).populate("category");

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

exports.update = async (req, res) => {
  try {
    const { id } = req?.params;
    const data = req?.body;
    const oldCategoryId = data?.oldCategory;
    const newCategoryId = data?.newCategory;

    if (oldCategoryId) {
      await Categories.findByIdAndUpdate(
        oldCategoryId,
        { $pull: { subCategories: id } },
        { new: true }
      );
    }

    if (newCategoryId) {
      await Categories.findByIdAndUpdate(
        newCategoryId,
        { $push: { subCategories: id } },
        { new: true }
      );
    }

    let info = {
      category: newCategoryId,
      name: data?.name,
      order: data?.order,
      slug: data?.name?.split(" ").join("-"),
    };

    const result = await SubCategory.findByIdAndUpdate(id, info, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "update success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const { id } = req?.params;
    const subCategory = await SubCategory.findById(id);

    if (!subCategory) {
      return res.status(400).json({
        success: false,
        error: "Sub Category not found",
      });
    }

    await Categories.findByIdAndUpdate(
      subCategory?.category,
      { $pull: { subCategories: id } },
      { new: true }
    );

    let result = await SubCategory.deleteOne({ _id: id });

    if (result) {
      res.status(200).json({
        success: true,
        message: "Delete success",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
