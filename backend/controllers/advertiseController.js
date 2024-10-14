const fs = require("fs");
const Advertise = require("../models/advertiseModel");
const { pick } = require("../utils/pick");

exports.addAdvertise = async (req, res) => {
  const image = req?.file?.filename;
  const data = req.body;

  try {
    if (!image) {
      return res.status(404).json({
        success: false,
        error: "Image is requred",
      });
    }

    const result = await Advertise.create({
      image: image,
      ...data,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Advertise not added",
      });
    }

    res.status(200).json({
      success: true,
      message: "Advertise added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });

    fs.unlink(`./uploads/advertise/${image}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};

exports.getAdvertises = async (req, res) => {
  const filters = pick(req.query, ["showingPlace"]);

  const { showingPlace } = filters;
  try {
    const andConditions = [];

    if (showingPlace) {
      andConditions.push({ showingPlace: showingPlace });
    }

    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};

    const advertises = await Advertise.find(whereConditions).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      message: "Advertise found successfully",
      data: advertises,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateAdvertise = async (req, res) => {
  const image = req?.file?.filename;

  try {
    const body = req?.body;

    const id = req?.params?.id;
    const isAdvertise = await Advertise.findOne({ _id: id });

    if (!isAdvertise) {
      return res.status(404).json({
        success: false,
        error: "Advertise not found",
      });
    }

    if (image) {
      const newAdvertise = {
        ...body,
        image: image,
      };

      await Advertise.findByIdAndUpdate(id, newAdvertise, { new: true });

      fs.unlink(`./uploads/advertise/${isAdvertise?.image}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    } else {
      const newAdvertise = {
        ...body,
      };

      await Advertise.findByIdAndUpdate(id, newAdvertise, { new: true });
    }

    res.status(200).json({
      success: true,
      message: "Advertise updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });

    fs.unlink(`./uploads/advertise/${image}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};

exports.deleteAdvertise = async (req, res) => {
  try {
    const { id } = req?.params;
    const isAdvertise = await Advertise.findOne({ _id: id });

    if (isAdvertise) {
      await Advertise.findByIdAndDelete(id);

      fs.unlink(`./uploads/advertise/${isAdvertise?.image}`, (err) => {
        if (err) {
          console.error(err);
        }
      });

      res.status(200).json({
        success: true,
        message: "Advertise deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getSingleAdvertise = async (req, res) => {
  try {
    const { id } = req?.params;
    const isAdvertise = await Advertise.findOne({ _id: id });

    if (isAdvertise) {
      res.status(200).json({
        success: true,
        message: "Advertise found successfully",
        data: isAdvertise,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
