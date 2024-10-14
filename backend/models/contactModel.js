const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
    bio: {
      type: String,
    },
    address: {
      type: String,
    },
    cheifEditor: {
      type: String,
    },
    editor: {
      type: String,
    },
    regiNumber: {
      type: String,
    },
  },
  { timestamps: false }
);

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
