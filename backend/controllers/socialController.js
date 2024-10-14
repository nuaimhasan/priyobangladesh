const Social = require("../models/socialModel");

exports.add = async (req, res) => {
  try {
    const data = req.body;

    const isExited = await Social.findOne({});
    if (isExited?._id) {
      return res.status(500).json({
        success: false,
        message: "Social already added",
      });
    }

    const result = await Social.create(data);

    res.status(201).json({
      success: true,
      message: "add success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
};

exports.get = async (req, res) => {
  try {
    const result = await Social.findOne({});

    res.status(200).json({
      success: true,
      message: "get success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req?.body;
    const result = await Social.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({
      success: true,
      message: "update success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
};
