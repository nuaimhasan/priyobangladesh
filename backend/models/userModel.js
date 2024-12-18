const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const News = require("./newsModel");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      default: "writer",
      enum: ["writer", "admin"],
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "active",
      enum: ["active", "inactive"],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.pre("findOneAndDelete", async function (next) {
  const writterId = this.getQuery()._id;
  const newsCount = await News.countDocuments({ writer: writterId });

  if (newsCount > 0) {
    const error = new Error(
      "Cannot delete user with associated news articles."
    );

    return next(error);
  }

  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
