const mongoose = require("mongoose");
const Crop = require("./models").Crop;
const fs = require("fs");
const path = require("path");
const datasetPath = "./dataset/";
const dotenv = require("dotenv");
dotenv.config();
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

pwd = encodeURIComponent(pwd);
mongoose.connect(process.env.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const list = [];

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to database.");

  fs.readdir(datasetPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    files.forEach((file) => {
      const filePath = path.join(datasetPath, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        const crop = new Crop({
          name: file,
          properties: {},
        });
        fs.readdir(filePath, (err, props) => {
          if (err) {
            console.error(err);
            return;
          }
          props.forEach((prop) => {
            const propertyPath = path.join(filePath, prop);
            const stat = fs.statSync(propertyPath);
            if (stat.isFile()) {
              const text = fs.readFileSync(propertyPath).toString().trim();
              const propertyName = path.parse(prop).name.trim();
              crop.properties.set(propertyName, text);
            }
          });
        });
        console.log("Saving", file);
        list.push(crop);
      }
    });
  });
  setTimeout(() => {
    Crop.insertMany(list)
      .then(() => {
        console.log("Done", list.length);
        mongoose.disconnect();
      })
      .catch((err) => {
        console.log(list.length);
        console.error(err);
      });
  }, 1000);
});
