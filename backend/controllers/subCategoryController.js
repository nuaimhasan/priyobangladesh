const slugify = require("slugify");
const Categories = require("../models/categoriesModel");
const SubCategory = require("../models/subCategoryModel");

exports.add = async (req, res) => {
  try {
    const data = req.body;
    const slug = slugify(data?.nameEN);

    const info = {
      ...data,
      slug,
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
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.get = async (req, res) => {
  const { category } = req.query;
  try {
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
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSingle = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await SubCategory.findById(id).populate("category");

    res.status(200).json({
      success: true,
      message: "Sub Category found successfully",
      data: category,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req?.params;
    const data = req?.body;
    const category = data?.category;

    console.log(data);

    const isExit = await SubCategory.findById(id);
    if (!isExit) {
      return res.json({
        success: false,
        message: "Sub Category not found",
      });
    }

    if (category && isExit.category.toString() !== category) {
      await Categories.findByIdAndUpdate(isExit.category, {
        $pull: { subCategories: id },
      });

      await Categories.findByIdAndUpdate(category, {
        $addToSet: { subCategories: id },
      });

      isExit.category = category;
    }

    isExit.name = data?.name;
    isExit.nameEN = data?.nameEN;
    isExit.slug = slugify(data?.nameEN);
    isExit.order = data?.order;

    await isExit.save();

    res.status(200).json({
      success: true,
      message: "update success",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const { id } = req?.params;
    const subCategory = await SubCategory.findById(id);

    if (!subCategory) {
      return res.json({
        success: false,
        message: "Sub Category not found",
      });
    }

    await Categories.findByIdAndUpdate(
      subCategory?.category,
      { $pull: { subCategories: id } },
      { new: true }
    );

    await SubCategory.findByIdAndDelete(id);

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
