const fs = require("fs");
const path = require("path");

const dataset = fs.readdirSync("dataset");

const out = {
  synonym: {
    entities: {},
    matchType: "FUZZY_MATCH",
  },
};

props = new Set();

dataset.forEach((crop) => {
  const cropProps = fs.readdirSync("dataset/" + crop);
  cropProps.forEach((prop) => {
    const propName = path.parse(prop).name;
    props.add(propName);
  });
});

for (let item of props) {
  item = item.trim();
  out.synonym.entities[item] = {
    synonyms: [item],
  };
}

console.log(JSON.stringify(out));
