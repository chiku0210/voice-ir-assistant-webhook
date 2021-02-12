const Crop = require("./models");

function get_crop_names() {
  const p = new Promise((res, rej) => {
    Crop.find((err, docs) => {
      if (err) {
        rej(err);
      }
      ans = docs.map((crop) => crop.name);
      res(ans);
    });
  });
  return p;
}

function get_properties(crop) {
  const p = new Promise((res, rej) => {
    Crop.findOne({ name: crop }, (err, doc) => {
      if (err) {
        rej(err);
      }
      res(doc);
    });
  });

  return p;
}

module.exports = {
  get_crop_names: get_crop_names,
  get_properties: get_properties,
};
