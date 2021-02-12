const fs = require("fs");

const dataset = fs.readdirSync("dataset");

const out = {
  synonym: {
    entities: {},
  },
  matchType: "EXACT_MATCH",
};

dataset.forEach((crop) => {
  out.synonym.entities[crop] = {
    synonyms: [crop],
  };
});

console.log(JSON.stringify(out));
