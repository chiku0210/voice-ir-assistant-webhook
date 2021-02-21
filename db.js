const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
pwd = process.env.DB_PWD;

function init() {
  mongoose.connect(
    `mongodb+srv://root:${pwd}@hereisdx.khs4b.mongodb.net/voice-ir?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
}

module.exports = init;
