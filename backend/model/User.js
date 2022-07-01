const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  country: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    require: true,
    min: 6,
    max: 255,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    min: 6,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  contacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
