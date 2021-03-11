const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

function init() {
  mongoose.connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
}

module.exports = init;
