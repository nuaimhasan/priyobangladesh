const mongoose = require("mongoose");

const advertiseSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    showingPlace: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const Advertise = mongoose.model("Advertise", advertiseSchema);

module.exports = Advertise;
