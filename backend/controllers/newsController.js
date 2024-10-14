const News = require("../models/newsModel");
const { calculatePagination } = require("../utils/calculatePagination");
const { pick } = require("../utils/pick");
const fs = require("fs");
const Categories = require("../models/categoriesModel");
const SubCategories = require("../models/subCategoryModel");

exports.addNews = async (req, res) => {
  const image = req.file.filename;
  const data = req.body;
  const user = req.user;

  const status = user?.role == "admin" ? "active" : "pending";

  if (!image) {
    return res.json({
      success: false,
      message: "Image is required",
    });
  }

  const slug = data.title.split(" ").join("-") + "-" + Date.now(); //for bangla language

  try {
    const news = {
      ...data,
      image,
      slug: slug,
      status,
      subCategory: data?.subCategory ? data?.subCategory : undefined,
    };

    const result = await News.create(news);

    res.status(200).json({
      success: true,
      message: "News created successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });

    fs.unlink(`./uploads/news/${image}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

exports.updateNews = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const image = req?.file?.filename;

  try {
    const news = await News.findById(id);
    const uploadedImage = news?.image;
    if (!news) {
      return res.json({
        success: false,
        message: "News not found",
      });
    }

    const slug = data.title.split(" ").join("-") + "-" + Date.now(); //for bangla language

    let updatedNews;
    if (image) {
      updatedNews = {
        ...data,
        image,
        slug: slug,
        subCategory: data?.subCategory ? data?.subCategory : undefined,
      };

      fs.unlink(`./uploads/news/${uploadedImage}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    } else {
      updatedNews = {
        ...data,
        slug,
      };
    }

    await News.findByIdAndUpdate(id, updatedNews, { new: true });

    res.status(200).json({
      success: true,
      message: "News updated successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });

    fs.unlink(`./uploads/news/${image}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

exports.deleteNews = async (req, res) => {
  const { id } = req.params;

  try {
    const news = await News.findById(id);

    if (!news) {
      return res.json({
        success: false,
        message: "News not found",
      });
    }

    await News.findByIdAndDelete(id);

    fs.unlink(`./uploads/news/${news.image}`, (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.status(200).json({
      success: true,
      message: "News deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getNewsById = async (req, res) => {
  const { id } = req.params;

  try {
    const news = await News.findById(id)
      .populate("category subCategory")
      .populate("writer");

    if (!news) {
      return res.json({
        success: false,
        message: "News not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "News found successfully",
      data: news,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getNewsBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const news = await News.findOne({ slug })
      .populate("category subCategory")
      .populate("writer");

    if (!news) {
      return res.json({
        success: false,
        message: "News not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "News found successfully",
      data: news,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllNews = async (req, res) => {
  const paginationOptions = pick(req.query, ["page", "limit"]);
  const filters = pick(req.query, [
    "category",
    "subCategory",
    "title",
    "status",
  ]);

  const { category, subCategory, title, status } = filters;
  const { page, limit, skip } = calculatePagination(paginationOptions);

  const IsCategory = await Categories.findOne({ slug: category });
  const categoryId = IsCategory?._id;

  const IsSubCategory = await SubCategories.findOne({ slug: subCategory });
  const subCategoryId = IsSubCategory?._id;

  try {
    const andConditions = [];

    if (categoryId) {
      andConditions.push({ category: categoryId });
    }

    if (subCategoryId) {
      andConditions.push({ subCategory: subCategoryId });
    }

    if (title) {
      andConditions.push({ title: { $regex: title, $options: "i" } });
    }

    if (status) {
      andConditions.push({ status: status });
    }

    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};

    const newses = await News.find(whereConditions)
      .populate("category subCategory")
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await News.countDocuments(whereConditions);
    const pages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      message: "News found successfully",
      meta: {
        total,
        page,
        limit,
        pages,
      },
      data: newses,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateStatus = async (req, res) => {
  const id = req.params.id;

  try {
    const news = await News.findById(id);

    if (!news) {
      return res.json({
        success: false,
        message: "News not found",
      });
    }

    const status =
      news?.status === "pending"
        ? "active"
        : news?.status === "active"
        ? "inactive"
        : news?.status === "inactive"
        ? "active"
        : "active";

    await News.findByIdAndUpdate(
      id,
      {
        $set: { status: status },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "News status updated successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getNewsesByWriter = async (req, res) => {
  const { writerId } = req.params;
  const paginationOptions = pick(req.query, ["page", "limit"]);
  const filters = pick(req.query, ["title", "status"]);

  const { title, status } = filters;
  const { page, limit, skip } = calculatePagination(paginationOptions);

  try {
    const andConditions = [];

    if (title) {
      andConditions.push({ title: { $regex: title, $options: "i" } });
    }

    if (status) {
      andConditions.push({ status: status });
    }

    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};

    const newses = await News.find({ writer: writerId, ...whereConditions })
      .populate("category subCategory")
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await News.countDocuments({
      writer: writerId,
      ...whereConditions,
    });

    const pages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      message: "News found successfully",
      meta: {
        total,
        page,
        limit,
        pages,
      },
      data: newses,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
