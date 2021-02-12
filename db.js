const mongoose = require("mongoose");
const cropSchema = require("./models");
const fs = require("fs");
const path = require("path");
const datasetPath = "./dataset/";
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Enter database password:", (pwd) => {
  pwd = encodeURIComponent(pwd);
  mongoose.connect(
    `mongodb+srv://root:${pwd}@hereisdx.khs4b.mongodb.net/voice-ir?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  const Crop = mongoose.model("Crop", cropSchema);

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
                const text = fs.readFileSync(propertyPath).toString();
                const propertyName = path.parse(prop).name;
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
  readline.close();
});

module.exports = cropSchema;
