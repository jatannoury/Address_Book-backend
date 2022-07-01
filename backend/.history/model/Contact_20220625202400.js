const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  phoneNb: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    unique: true,
  },
  rlsStatus: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    unique: true,
  },
  lat: {
    type: Number,
    required: true,
    min: 6,
    max: 255,
  },
  long: {
    type: Number,
    required: true,
    min: 6,
    max: 255,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // cur_user:[{
  //     type:mongoose.Schema.Types.ObjectId,
  //     ref:'User'
  //   }],
});

module.exports = mongoose.model("Contact", contactSchema);
