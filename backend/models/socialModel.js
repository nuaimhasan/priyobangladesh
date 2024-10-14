const mongoose = require("mongoose");

const socialSchema = new mongoose.Schema(
  {
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    youtube: {
      type: String,
    },
  },
  { timestamps: false }
);

const Social = mongoose.model("Social", socialSchema);

module.exports = Social;
