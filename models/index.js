const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  name: String,
  properties: {
    type: Map,
    of: String,
  },
});

module.exports = cropSchema;
