const express = require("express");
const { conversation, Suggestion } = require("@assistant/conversation");
const bodyParser = require("body-parser");
const db = require("./db");
const PORT = process.env.PORT || 5000;
const app = conversation(); // Actions
db(); // Setup database

const { get_crop } = require("./data");

app.handle("crop_information_property_prompt", async (conv) => {
  const crop_name = conv.session.params.crop_name_slot;
  conv.add(`आप ${crop_name} के बारे में क्या जानना चाहते हैं?`);
  const crop = await get_crop(crop_name);
  const props = crop.properties.keys();
  for (let i = 0; i < 8; i++) {
    const val = props.next().value;
    if (!val) {
      break;
    }
    conv.add(new Suggestion({ title: val }));
  }
});

app.handle("crop_data", async (conv) => {
  const crop_name = conv.session.params.crop_name_slot;
  const property = conv.session.params.crop_property;

  const crop = await get_crop(crop_name);
  conv.add(
    crop.properties.get(property) ||
      `No information for ${crop_name}>${property}`
  );
});

express()
  .use(bodyParser.json())
  .post("/", app)
  .get("/", async (_req, res) => {
    const crop = await get_crop("धान");
    const props = crop.properties.keys();
    res.json(crop.properties.keys().next().value);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
