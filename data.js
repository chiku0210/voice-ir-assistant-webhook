const Crop = require("./models").Crop;

async function get_crop_names() {
  const p = new Promise((res, rej) => {
    Crop.find((err, docs) => {
      if (err) {
        rej(err);
      }
      ans = docs.map((crop) => crop.name);
      res(ans);
    });
  });
  return await p;
}

async function get_crop(crop) {
  const p = new Promise((res, rej) => {
    Crop.findOne({ name: crop }, (err, doc) => {
      if (err) {
        rej(err);
      }
      res(doc);
    });
  });

  return await p;
}

module.exports = {
  get_crop_names: get_crop_names,
  get_crop: get_crop,
};
