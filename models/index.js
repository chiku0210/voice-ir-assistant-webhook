const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  name: String,
  properties: {
    type: Map,
    of: String,
  },
});

const logSchema = new mongoose.Schema({
  type: {
    type: String,
    index: true,
  },
  message: String,
  time: {
    type: Date,
    default: Date.now,
  },
  data: mongoose.Schema.Types.Mixed,
});

module.exports = {
  Crop: mongoose.model("Crop", cropSchema),
  Log: mongoose.model("Log", logSchema),
};
