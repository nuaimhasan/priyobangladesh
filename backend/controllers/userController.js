const fs = require("fs");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { createJsonWebToken } = require("../utils/jsonWebToken");
const { pick } = require("../utils/pick");
const { calculatePagination } = require("../utils/calculatePagination");

exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // 2. Load User
    const user = await User.findOne({ userName: userName });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User not found",
      });
    }

    // 3. Match Password
    const isMatch = await bcrypt.compare(password, user?.password);

    if (!isMatch) {
      return res.status(404).json({
        success: false,
        error: "User-Name or password is incorrect",
      });
    }

    // 5. generate token
    let accessToken = "";
    const role = user?.role;
    accessToken = createJsonWebToken({ userName, password, role }, "6h");

    res.status(200).json({
      success: true,
      message: "Login Success",
      token: accessToken,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await User.findById(id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        error: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getUserBySlug = async (req, res) => {
  try {
    const { userName } = req.params;

    const admin = await User.findOne({ userName });

    if (!admin) {
      return res.status(404).json({
        success: false,
        error: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.user.userName });

    if (user) {
      res.status(200).json({
        success: true,
        data: user,
      });
    } else {
      res.status(404).json({
        success: false,
        error: "user not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone } = req.body;
    const image = req?.file?.filename;

    const user = await User.findOne({ _id: id });
    const uploadedImage = user?.image;

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    if (image) {
      if (uploadedImage && uploadedImage !== null) {
        fs.unlink(`./uploads/user/${uploadedImage}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }

      const newData = {
        name: name,
        phone: phone,
        image,
      };

      await User.findByIdAndUpdate(id, newData, { new: true });
    } else {
      const newData = {
        name: name,
        phone: phone,
      };

      await User.findByIdAndUpdate(id, newData, { new: true });
    }

    res.status(200).json({
      success: true,
      message: "Update success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  const id = req.params.id;
  const { oldPassword, newPassword } = req.body;
  console.log(req.body);

  try {
    const user = await User.findById(id);

    const isMatch = await bcrypt.compare(oldPassword, user?.password);
    if (!isMatch) {
      return res.status(404).json({
        success: false,
        error: "Password is incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Password update success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const isExist = await User.findById(id);
    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    if (isExist?.image && isExist?.image !== null) {
      fs.unlink(`./uploads/user/${isExist?.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "user delete success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

//  ------------------ writer ------------------

exports.addWriter = async (req, res) => {
  const data = req.body;

  try {
    const newData = {
      ...data,
      role: "writer",
    };

    const user = await User.create(newData);

    res.status(200).json({
      success: true,
      message: "Writer added successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAllWriters = async (req, res) => {
  const paginationOptions = pick(req.query, ["page", "limit"]);
  const filters = pick(req.query, ["name", "status"]);

  const { name, status } = filters;
  const { page, limit, skip } = calculatePagination(paginationOptions);

  try {
    const andConditions = [];

    if (name) {
      andConditions.push({ name: { $regex: name, $options: "i" } });
    }

    if (status) {
      andConditions.push({ status: status });
    }

    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};

    const writers = await User.find(whereConditions)
      .where("role")
      .equals("writer");

    const total = await User.countDocuments(whereConditions);

    res.status(200).json({
      success: true,
      data: writers,
      meta: {
        total: total,
        page: page,
        limit: limit,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateStatus = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const status = user?.status === "active" ? "inactive" : "active";

    await User.findByIdAndUpdate(
      id,
      {
        $set: { status: status },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "user status updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// ------------------ admin ------------------

exports.addAdmin = async (req, res) => {
  const data = req.body;

  try {
    const newData = {
      ...data,
      role: "admin",
    };

    const user = await User.create(newData);

    res.status(200).json({
      success: true,
      message: "Admin added successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({}).where("role").equals("admin");

    res.status(200).json({
      success: true,
      data: admins,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
